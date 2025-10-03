import VehicleCard from '../VehicleCard'
import vehicleImage from "@assets/stock_images/electric_scooter_pro_ed0c12d8.jpg";

export default function VehicleCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <VehicleCard
        name="FALCON"
        image={vehicleImage}
        range="150 KM/Charge"
        battery="Lithium-ION, 3 Year Warranty"
        link="/vehicle/falcon"
      />
    </div>
  )
}