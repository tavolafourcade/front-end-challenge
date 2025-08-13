import ImageAnalyzerContainer from './features/analyzer/containers/ImageAnalyzerContainer'
import ImageQueueContainer from './features/images/containers/ImageQueueContainer'

function App() {
  return (
    <div className="p-5 max-w-[1024px] mx-auto">
      <h1 className="text-3xl font-bold my-5">Image Analyzer</h1>
      <ImageAnalyzerContainer />
      <ImageQueueContainer />
    </div>
  )
}

export default App
