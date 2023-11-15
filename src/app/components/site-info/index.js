import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { NewfoldRuntime } from "@newfold-labs/wp-module-runtime";
import { Button } from "@newfold/ui-component-library";
import { MojoIcon, WordPressIcon } from "../icons";

export const SiteInfoBar = () => {
    const { url, title } = NewfoldRuntime.siteDetails;
    const parsedUrl = new URL(url);
    const siteDomain = parsedUrl.hostname;
    const hasSSL = parsedUrl.protocol.includes("https");
    const isEcommerce = NewfoldRuntime.hasCapability("isEcommerce");
    const isStore = window.location.href?.includes("store");

    const renderPadLock = () => {
        if (hasSSL) {
            return <LockClosedIcon className="nfd-w-auto nfd-h-3.5 nfd-text-[#1CD67D]" />
        }

        return <LockOpenIcon className="nfd-w-auto nfd-h-3.5 nfd-text-[#d61c1c]" />
    }

    return (
        <div className="wppm-app-site-info nfd-bg-[#25253C] nfd-w-full nfd-py-6 nfd-px-8 nfd-mb-8 nfd-border nfd-border-line nfd-rounded-lg">
            <div className="nfd-flex nfd-justify-between nfd-items-center nfd-flex-wrap nfd-gap-4">

                <div className="nfd-w-max nfd-flex nfd-flex-col nfd-gap-1.5">
                    <h3 className="nfd-text-white nfd-text-2xl nfd-font-semibold">{title}</h3>
                    <div className="nfd-flex nfd-items-center nfd-gap-3 nfd-font-medium">
                        <div className="nfd-flex nfd-items-center nfd-gap-1">
                            {renderPadLock()}
                            <span className="nfd-text-white nfd-text-tiny">{siteDomain}</span>
                        </div>
                    </div>
                </div>

                <div className="nfd-w-max nfd-flex nfd-items-center nfd-flex-wrap nfd-gap-3">
                    <Button 
                        as="a"
                        id="site_info_portal_button"
                        href='https://www.mojomarketplace.com/login'
                        target="_blank"
                        variant="primary" 
                        className="nfd-bg-primary-400 nfd-text-tiny nfd-w-full min-[400px]:nfd-w-auto">
                        <MojoIcon />
                        { __("MOJO Account", "wp-plugin-mojo") }
                    </Button>
                    <Button 
                        as="a" 
                        id="site_info_site_button"
                        href={(isEcommerce && isStore) ? `${url}/shop` : url}
                        target="_blank" 
                        variant="primary" 
                        className="nfd-bg-white nfd-text-[#212936] nfd-text-tiny nfd-w-full min-[400px]:nfd-w-auto"
                    >
                        <WordPressIcon />
                       { (isEcommerce && isStore) ? __("View Store", "wp-plugin-mojo") : __("View Site", "wp-plugin-mojo") }
                    </Button>
                </div>
                
            </div>
        </div>
    );
}