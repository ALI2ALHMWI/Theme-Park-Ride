import { ChangeEvent, useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const QUEUE_URL = "./initial-queue.json";

interface QUEUE {
  id: number;
  groupName: string;
  riders: number;
}

async function fetchQueueData(): Promise<QUEUE[]> {
  const response = await fetch(QUEUE_URL);
  const data = (await response.json()) as QUEUE[];
  return data;
}

function App() {
  const [queue, setQueue] = useState<QUEUE[]>([]);
  const [isLoadingQueue, setIsLoading] = useState(true);
  const [hasQueueError, setHasQueueError] = useState(false);

  async function loadQueue() {
    setIsLoading(true);
    setHasQueueError(false);

    try {
      const queueData = await fetchQueueData();
      setQueue(queueData);
    } catch (error) {
      console.error("Error loading queue:", error);
      setHasQueueError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadQueue();
  }, []);

  return (
    <div className="app-shell">
      <Header />
      <main className="main-content">
        {isLoadingQueue && (
          <p className="status-message">Loading the ride queue...</p>
        )}

        {!isLoadingQueue && hasQueueError && (
          <div className="error-message" role="alert">
            <p>We could not load the ride queue.</p>

            <button type="button" className="retry-button" onClick={loadQueue}>
              Try Again
            </button>
          </div>
        )}

        {!isLoadingQueue && !hasQueueError && (
          <section className="queue-section">
            <div className="section-heading">
              <div>
                <p className="section-eyebrow">Skyline Comet</p>
                <h1 className="section-title">RideLine</h1>
                <p className="section-description">
                  {queue.length} groups are waiting in line.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
