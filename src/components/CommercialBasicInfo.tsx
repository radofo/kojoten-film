import React from "react"
import {
  CommercialBasicInfoContainer,
  CommercialDetailHeader,
  CommercialMoreDetails,
} from "./CommercialBasicInfoStyles"

export type CommercialBasicInfoProps = {
  details: {
    kunde?: string
    name: string
  }
}

const CommercialBasicInfo = ({ details }: CommercialBasicInfoProps) => {
  return (
    <CommercialBasicInfoContainer>
      {details.kunde && (
        <CommercialDetailHeader>{details.kunde}</CommercialDetailHeader>
      )}
      <CommercialMoreDetails>{details.name}</CommercialMoreDetails>
    </CommercialBasicInfoContainer>
  )
}

export default CommercialBasicInfo
