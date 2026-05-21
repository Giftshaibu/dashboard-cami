import { useEnvironmentMode } from "@/components/dashboard/environment-mode-provider"
import { Switch } from "@/components/ui/switch"

export function ModeToggle() {
  const { liveMode, setLiveMode } = useEnvironmentMode()

  return (
    <div className="hidden items-center gap-2 rounded-md border bg-card px-3 py-2 text-xs font-medium text-foreground md:flex">
      <span className={liveMode ? "text-muted-foreground" : "text-foreground"}>Sandbox</span>
      <Switch
        checked={liveMode}
        onCheckedChange={setLiveMode}
        aria-label="Toggle sandbox and live mode"
      />
      <span className={liveMode ? "text-foreground" : "text-muted-foreground"}>Live</span>
    </div>
  )
}
