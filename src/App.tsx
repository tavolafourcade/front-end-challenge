import AnnotationContainer from './features/annotation/containers/AnnotationContainer'
import ImageQueueContainer from './features/images/containers/ImageQueueContainer'

function App() {
  return (
    <div className="p-5 max-w-[1024px] mx-auto">
      <h1 className="text-3xl font-bold my-5">Image Analyzer</h1>
      <AnnotationContainer />
      <ImageQueueContainer />
    </div>
  )
}

export default App
