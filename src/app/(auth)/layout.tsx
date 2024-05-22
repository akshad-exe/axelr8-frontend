import { Icons } from "@/assets/icons";
import { Vortex } from "@/components/ui/background-beams";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="relative w-full h-screen flex">
                <div className="absolute top-[32px] left-[32px] flex items-center gap-[12px] text-background z-10 max-lg:text-foreground ">
                    <Icons.logoLight className="h-[34px] w-[34px] max-lg:hidden" />
                    <Icons.logoDark className="h-[34px] w-[34px] hidden max-lg:block" />
                    <span className=" font-mainhead text-[27px] max-xs:hidden">Axelr8</span>
                </div>
                <div className="relative w-full flex flex-1 bg-foreground text-background max-lg:hidden">
                    <div className="w-full flex flex-col justify-end p-[32px]">
                        <blockquote className="space-y-2 relative z-40">
                            <span>
                                &quot;This platform accelerated our product security program. Its
                                highly tailored templates and easy to use UI let us easily adopt new security procedures without bottlenecks.&quot;
                            </span>
                        </blockquote>
                                            </div>
                                            <Vortex/>
                </div>
                <div className="w-full flex h-screen items-center justify-center flex-1 ">
                    {children}
                </div>
            </div>
        </>
    );
}
