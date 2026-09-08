import { useEffect, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import NowBoarding from "./components/NowBoarding";
import QueueForm from "./components/QueueForm";
import QueueList from "./components/QueueList";
import QueueSummary from "./components/QueueSummary";
import  { QUEUE } from "./types/queue";

const QUEUE_URL = "/initial-queue.json";

async function fetchQueueData(): Promise<QUEUE[]> {
  const response = await fetch(QUEUE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch queue");
  }

  const data = (await response.json()) as QUEUE[];

  return data;
}

function App() {
  const [queue, setQueue] = useState<QUEUE[]>([]);
  const [isLoadingQueue, setIsLoadingQueue] = useState(true);
  const [hasQueueError, setHasQueueError] = useState(false);
  const [nowBoarding, setNowBoarding] = useState<QUEUE | null>(null);
  const [boardedCount, setBoardedCount] = useState(0);

  async function loadQueue() {
    setIsLoadingQueue(true);
    setHasQueueError(false);

    try {
      const queueData = await fetchQueueData();
      setQueue(queueData);
    } catch (error) {
      console.error("Error loading queue:", error);
      setHasQueueError(true);
    } finally {
      setIsLoadingQueue(false);
    }
  }

  function handleAddGroup(groupName: string, riders: number) {
    const newEntry: QUEUE = {
      id: Date.now(),
      groupName,
      riders,
    };

    setQueue((currentQueue) => [...currentQueue, newEntry]);
  }

  function handleBoardNext() {
    if (queue.length === 0) {
      return;
    }

    const [boardedGroup, ...remainingQueue] = queue;

    setQueue(remainingQueue);
    setNowBoarding(boardedGroup);
    setBoardedCount((currentCount) => currentCount + 1);
  }

  const waitingGroupsCount = queue.length;

  const waitingRidersCount = queue.reduce(
    (totalRiders, entry) => totalRiders + entry.riders,
    0,
  );

  const isQueueLong = queue.length >= 8;


  useEffect(() => {
    void loadQueue();
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
          <>
            <QueueSummary
              waitingGroupsCount={waitingGroupsCount}
              waitingRidersCount={waitingRidersCount}
              boardedCount={boardedCount}
            />

            {isQueueLong && (
              <aside className="queue-warning" role="status" aria-live="polite">
                <span className="queue-warning-mark" aria-hidden="true">
                  !
                </span>

                <div>
                  <strong>Long line ahead</strong>
                  <p>
                    The queue is busy right now. Please expect a longer wait.
                  </p>
                </div>
              </aside>
            )}

            <section className="queue-section">
              <div className="section-heading">
                <div>
                  <p className="section-eyebrow">Join the line</p>
                  <h1 className="section-title">Add a group</h1>
                  <p className="section-description">
                    New groups always join at the back of the queue.
                  </p>
                </div>
              </div>

              <QueueForm onAddGroup={handleAddGroup} />
            </section>

            <NowBoarding entry={nowBoarding} />

            <section className="queue-section">
              <div className="section-heading">
                <div>
                  <p className="section-eyebrow">Skyline Comet</p>
                  <h1 className="section-title">Waiting line</h1>
                  <p className="section-description">
                    Groups board in the order they arrive.
                  </p>
                </div>

                <div className="queue-actions">
                  <span className="queue-count">
                    {queue.length} {queue.length === 1 ? "group" : "groups"}{" "}
                    waiting
                  </span>

                  <button
                    type="button"
                    className="board-next-button"
                    onClick={handleBoardNext}
                    disabled={queue.length === 0}
                  >
                    Board Next
                  </button>
                </div>
              </div>

              <QueueList queue={queue} />
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
