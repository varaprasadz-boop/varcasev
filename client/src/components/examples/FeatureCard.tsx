import FeatureCard from '../FeatureCard'
import { Battery } from 'lucide-react'

export default function FeatureCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <FeatureCard
        icon={Battery}
        title="Long-Lasting Battery"
        description="150 KM range on a single charge with economical ride at just 13 Paise/KM"
      />
    </div>
  )
}