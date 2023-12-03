// Desc: Loading component for Suspense fallback
const Loading = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-background">
        <p className="text-foreground/90 text-md font-bold mb-0">Loading...</p>
    </div>
  )
}

export default Loading