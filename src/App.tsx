import { ChangeEvent, useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const QUEUE_URL = "./initial-queue.json";


interface QUEUE{
  id: number;
  groupName: string;
  riders : number;
}

async function fetchQueueData(): Promise<QUEUE[]> { 
  const response = await fetch(QUEUE_URL);
  const data = (await response.json()) as QUEUE[];
  return data;
}

function App() {
 const [queue, setQueue] = useState<QUEUE[]>([]);
  const [isLoadingQueue, setIsLoading] = useState(true);

  async function loadQueueData() {
    setIsLoading(true);
    try {
      const QueueEntry = await fetchQueueData();
      setQueue(QueueEntry);
    } catch (error) { 
     console.error("Error loading queue:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadQueueData();
  }, []);

  return (
    <div className="app-shell">
      <Header />
      <main className="main-content">
        {isLoadingQueue && (
          <p className="status-message">Loading the ride queue...</p>
        )}

        {!isLoadingQueue && (
          <section className="queue-section">
            <p className="section-eyebrow">Skyline Comet</p>
            <h1 className="section-title">RideLine</h1>
            <p className="section-description">
              {queue.length} groups are waiting in line.
            </p>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
