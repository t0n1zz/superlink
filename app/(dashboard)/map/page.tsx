import BuildersMap from "@/components/map/BuildersMap";

export default function MapPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Builders Map</h1>
      <p className="text-slate-600 mb-6">See verified builders by location.</p>
      <BuildersMap />
    </div>
  );
}
