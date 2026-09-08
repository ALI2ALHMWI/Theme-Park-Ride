import { ChangeEvent, useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import QueueForm from "./components/QueueForm";


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

  function handleAddGroup(groupName: string, riders: number) {
    const newEntry: QUEUE = {
      id: queue.length + 1,
      groupName,
      riders,
    };

    setQueue((currentQueue) => [...currentQueue, newEntry]);
  }


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
        <QueueForm onAddGroup={handleAddGroup} />
        {!isLoadingQueue && !hasQueueError && (
          <section className="queue-section">
            <div className="section-heading">
              <div>
                <p className="section-eyebrow">Skyline Comet</p>
                <h1 className="section-title">Waiting line</h1>
                <p className="section-description">
                  Groups board in the order they arrive.
                </p>
              </div>

              <span className="queue-count">
                {queue.length} {queue.length === 1 ? "group" : "groups"} waiting
              </span>
            </div>

            {queue.length === 0 ? (
              <p className="queue-empty">No groups are waiting right now.</p>
            ) : (
              <ul className="queue-list">
                {queue.map((entry, index) => (
                  <li
                    key={entry.id}
                    className={`queue-card ${index === 0 ? "next-to-board" : ""}`}
                  >
                    <span className="queue-position">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="queue-card-info">
                      {index === 0 && (
                        <span className="next-label">NEXT TO BOARD</span>
                      )}

                      <h2 className="queue-group-name">{entry.groupName}</h2>

                      <p className="queue-rider-count">
                        {entry.riders} {entry.riders === 1 ? "rider" : "riders"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
