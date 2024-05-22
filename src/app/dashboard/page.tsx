import { Vortex } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="w-full mx-auto  h-screen overflow-hidden">
            <Vortex backgroundColor="black"
                rangeY={700}
                particleCount={600}
                className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
                baseHue={800}>
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                    <Button className="px-6 py-6 f">Axelr8 v1</Button>
                </div>
            </Vortex>
        </div>
    );
}
