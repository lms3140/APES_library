import { InquiryItem } from "./InquiryItem";

export function InquiryList({ inquiries, setInquiries }) {
  const handleDeleteItem = (deletedId) => {
    setInquiries((prev) => prev.filter((item) => item.inquiryId !== deletedId));
  };

  return (
    <div>
      {inquiries.map((item) => (
        <InquiryItem
          key={item.inquiryId}
          inquiry={item}
          onDelete={handleDeleteItem}
        />
      ))}
    </div>
  );
}
