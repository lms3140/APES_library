import { InquiryItem } from "./InquiryItem";

export function InquiryList({ inquiries }) {
  return (
    <div>
      {inquiries.map((item) => (
        <InquiryItem key={item.inquiryId} inquiry={item} />
      ))}
    </div>
  );
}
