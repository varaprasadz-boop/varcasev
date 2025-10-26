import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Fuel, Zap, TrendingDown, Calculator } from "lucide-react";
import { vehicleDatabase } from "@/data/vehicleData";

interface VehicleEfficiency {
  name: string;
  slug: string;
  batteryCapacity: number;
  rangePerCharge: number;
  energyPerKm: number;
  displayRange: string;
}

function extractBatteryCapacity(specs: { label: string; value: string }[]): number | null {
  const batteryCapacitySpec = specs.find(s => s.label === "Battery Capacity");
  if (!batteryCapacitySpec) return null;

  const kWhMatch = batteryCapacitySpec.value.match(/([\d.]+)\s*kWh/);
  if (kWhMatch) {
    return parseFloat(kWhMatch[1]);
  }

  const voltAmpMatch = batteryCapacitySpec.value.match(/(\d+)V\s*(\d+)Ah/);
  if (voltAmpMatch) {
    const voltage = parseInt(voltAmpMatch[1]);
    const ampHours = parseInt(voltAmpMatch[2]);
    return (voltage * ampHours) / 1000;
  }

  return null;
}

function extractRange(specs: { label: string; value: string }[]): { range: number; display: string } | null {
  const rangeSpec = specs.find(s => s.label === "True Range/Charge" || s.label === "True Range");
  if (!rangeSpec) return null;

  const rangeMatch = rangeSpec.value.match(/(\d+)(?:-(\d+))?\s*km/);
  if (rangeMatch) {
    const minRange = parseInt(rangeMatch[1]);
    const maxRange = rangeMatch[2] ? parseInt(rangeMatch[2]) : minRange;
    return {
      range: minRange,
      display: rangeMatch[2] ? `${minRange}-${maxRange} km` : `${minRange} km`
    };
  }

  return null;
}

const vehicleEfficiencies: VehicleEfficiency[] = Object.entries(vehicleDatabase)
  .map(([slug, vehicle]) => {
    const batteryCapacity = extractBatteryCapacity(vehicle.specifications);
    const rangeInfo = extractRange(vehicle.specifications);

    if (!batteryCapacity || !rangeInfo) {
      return null;
    }

    return {
      name: vehicle.name,
      slug: slug,
      batteryCapacity: batteryCapacity,
      rangePerCharge: rangeInfo.range,
      energyPerKm: batteryCapacity / rangeInfo.range,
      displayRange: rangeInfo.display
    };
  })
  .filter((v): v is VehicleEfficiency => v !== null);

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    const duration = 1000;
    startTimeRef.current = undefined;

    const animate = (currentTime: number) => {
      if (startTimeRef.current === undefined) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);
      
      setDisplayValue(value * easedProgress);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value]);

  return (
    <span className="font-bold text-2xl">
      {prefix}{Math.round(displayValue).toLocaleString('en-IN')}{suffix}
    </span>
  );
}

export default function CostCalculator() {
  const [dailyKm, setDailyKm] = useState([50]);
  const [selectedVehicle, setSelectedVehicle] = useState<string>(vehicleEfficiencies[0]?.slug || "");

  const vehicle = vehicleEfficiencies.find(v => v.slug === selectedVehicle) || vehicleEfficiencies[0];

  if (!vehicle) {
    return null;
  }

  const petrolCostPerDay = (dailyKm[0] / 50) * 100;
  const electricCostPerDay = dailyKm[0] * vehicle.energyPerKm * 5;

  const petrolCostPerMonth = petrolCostPerDay * 30;
  const electricCostPerMonth = electricCostPerDay * 30;

  const petrolCostPerYear = petrolCostPerDay * 365;
  const electricCostPerYear = electricCostPerDay * 365;

  const savingsPerMonth = petrolCostPerMonth - electricCostPerMonth;
  const savingsPerYear = petrolCostPerYear - electricCostPerYear;

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Calculator className="w-5 h-5" />
            <span className="font-semibold">Cost Savings Calculator</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Calculate Your Savings
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how much you can save by switching to electric. Compare petrol costs vs electricity costs for your daily commute.
          </p>
        </div>

        <Card className="p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-semibold mb-4" data-testid="label-daily-km">
                Daily Travel Distance: <span className="text-primary text-xl">{dailyKm[0]} km</span>
              </label>
              <Slider
                value={dailyKm}
                onValueChange={setDailyKm}
                max={200}
                min={10}
                step={5}
                className="mb-2"
                data-testid="slider-daily-km"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>10 km</span>
                <span>200 km</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-4" data-testid="label-select-model">
                Select VARCAS Model
              </label>
              <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                <SelectTrigger data-testid="select-vehicle-model">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {vehicleEfficiencies.map((v) => (
                    <SelectItem key={v.slug} value={v.slug}>
                      {v.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-2">
                Range: {vehicle.displayRange}/charge | Battery: {vehicle.batteryCapacity} kWh
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-2 border-destructive/20 bg-destructive/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <Fuel className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Petrol Cost</h3>
                  <p className="text-sm text-muted-foreground">@ ₹100/liter (50 km/liter)</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">Per Day</span>
                  <AnimatedNumber value={petrolCostPerDay} prefix="₹" />
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">Per Month</span>
                  <AnimatedNumber value={petrolCostPerMonth} prefix="₹" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Per Year</span>
                  <AnimatedNumber value={petrolCostPerYear} prefix="₹" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-primary/20 bg-primary/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Electric Cost</h3>
                  <p className="text-sm text-muted-foreground">@ ₹5/unit ({vehicle.name})</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">Per Day</span>
                  <AnimatedNumber value={electricCostPerDay} prefix="₹" />
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">Per Month</span>
                  <AnimatedNumber value={electricCostPerMonth} prefix="₹" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Per Year</span>
                  <AnimatedNumber value={electricCostPerYear} prefix="₹" />
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 mt-6 bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary rounded-lg">
                  <TrendingDown className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">Your Savings with Electric</h3>
                  <p className="text-sm text-muted-foreground">Switch to VARCAS and save big!</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">Monthly Savings</div>
                <div className="text-3xl font-bold text-primary" data-testid="text-monthly-savings">
                  <AnimatedNumber value={savingsPerMonth} prefix="₹" />
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Annual: <AnimatedNumber value={savingsPerYear} prefix="₹" />
                </div>
              </div>
            </div>
          </Card>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            * Calculations based on average electricity cost of ₹5 per unit and petrol cost of ₹100 per liter with 50 km/liter mileage.
            For vehicles with range estimates, minimum range is used for conservative cost calculation.
          </p>
        </div>
      </div>
    </section>
  );
}
