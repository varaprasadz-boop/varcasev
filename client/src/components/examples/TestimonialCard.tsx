import TestimonialCard from '../TestimonialCard'
import customerImage from "@assets/stock_images/happy_customer_portr_4a379b91.jpg";

export default function TestimonialCardExample() {
  return (
    <div className="p-8 max-w-lg">
      <TestimonialCard
        quote="Varcas e-bikes have revolutionized my daily commute! The sleek design, long-lasting battery, and smooth ride make every journey effortless."
        name="Karthik Reddy"
        location="Bangalore"
        image={customerImage}
      />
    </div>
  )
}