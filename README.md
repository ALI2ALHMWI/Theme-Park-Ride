RideLine Queue Simulator

RideLine is a React and TypeScript ride-queue status board for the Skyline Comet attraction. It models a real waiting line using the FIFO rule: First In, First Out. Groups join at the back of the line, and the group at the front is always the next group to board.

The interface is designed as a live operations board rather than a generic CRUD dashboard. It includes a clear attraction header, a visible front-of-line indicator, a controlled join form, live queue counters, a Now Boarding area, and a responsive layout for narrower screens.

Features

The application loads its starting queue from public/initial-queue.json when it starts. While the request is pending, it displays a loading state. If loading fails, it presents an error message and a Try Again action that retries the request.

Users can add a group by entering a group name and a number of riders. The form is controlled by React state, validates its inputs, and appends valid groups to the end of the queue.

The queue is displayed in arrival order. The first group is visually marked with NEXT TO BOARD. The Board Next action removes only the group at the front, stores it as the latest boarded group, updates the live counters, and preserves the order of every remaining group.

The board also displays the number of groups waiting, the total number of riders waiting, and the number of groups that have boarded. Optional enhancements may include a long-line warning and a history of the most recent three boarded groups.

FIFO Rule

RideLine must always preserve this invariant:


A group that joins later must never board before a group that was already waiting.

Adding a group uses an append operation:

TSX


setQueue((currentQueue) => [...currentQueue, newEntry]);



Boarding removes the first entry and keeps the rest in the same order:

TSX


const [boardedGroup, ...remainingQueue] = queue;
setQueue(remainingQueue);



The application does not use priority boarding, sorting, drag-and-drop reordering, or manual selection of a later group.

Getting Started

Install the dependencies from the project root:

Bash


npm install



Start the development server:

Bash


npm run dev



The application will be available at the local URL printed by Vite.

Create a production build:

Bash


npm run build



Run the TypeScript check if the project contains the corresponding script:

Bash


npm run check



Initial Queue Data

The initial queue is stored in:

Plain Text


public/initial-queue.json



Each entry follows this shape:

Plain Text


type QueueEntry = {
  id: number;
  groupName: string;
  riders: number;
};



Example:

JSON


{
  "id": 1,
  "groupName": "The Alvarez Family",
  "riders": 4
}



The file is loaded through the public URL:

Plain Text


const QUEUE_URL = "/initial-queue.json";



Component Architecture

The application keeps queue state and queue operations in App. Presentational and input responsibilities are separated into focused components.

Component
Responsibility
App
Owns queue state, loading/error state, boarding history, counters, and event handlers.
Header
Identifies the Skyline Comet attraction and shows the live-board status.
Footer
Displays the board identity and FIFO reminder.
QueueForm
Controlled form for adding a group to the back of the queue.
QueueSummary
Displays live counters.
QueueList
Renders the queue in its current order.
QueueEntryCard
Displays one queue entry and marks the first entry as next to board.
NowBoarding
Displays the most recently boarded group.
RecentlyBoarded
Optional history view for the latest two or three boarded groups.




A shared type is used by the components:

Plain Text


src/types/queue.ts



TSX


export type QueueEntry = {
  id: number;
  groupName: string;
  riders: number;
};



Components receive typed, destructured props. App remains the owner of the data so that state changes are predictable and the child components remain focused.

State Model

The core state is organized around the queue lifecycle.

State
Meaning
queue
Groups that are currently waiting.
isLoadingQueue
Whether the initial queue request is still pending.
hasQueueError
Whether the initial queue request failed.
nowBoarding
The most recently boarded group, or null before the first boarding.
boardedCount
Number of groups that have boarded so far.
boardedHistory
Optional list containing the latest boarded groups.




The waiting-group count and waiting-rider count are derived from queue rather than stored as duplicate state:

TSX


const waitingGroupsCount = queue.length;

const waitingRidersCount = queue.reduce(
  (totalRiders, entry) => totalRiders + entry.riders,
  0,
);



This keeps the counters synchronized with the actual queue.

Optional Enhancements

Optional work should only be attempted after the CORE behavior is stable. Possible additions include validating the join form, displaying a warning when the line reaches a chosen threshold, showing the most recent two or three boarded groups, and displaying the total number of riders who have boarded.

These enhancements must not change the queue rule. They must not introduce priority groups, sorting by arbitrary criteria, drag-and-drop ordering, or any interaction that lets a later group board out of turn.

Manual Test Scenarios

The following scenarios verify the essential behavior:

Scenario
Expected result
Open the app
Loading appears before the queue is displayed.
Successful fetch
The full initial queue appears in its original order.
Failed fetch
A clear error and Try Again action appear.
Add a valid group
The group appears at the back of the queue.
Submit an empty name
The group is rejected with a validation message.
Submit an invalid rider count
The group is rejected with a validation message.
Press Board Next
Only the front group is removed.
Board repeatedly
Groups leave in exactly the order they joined.
Add after boarding
The new group joins behind all groups still waiting.
Empty queue
The board remains stable and Board Next is disabled.
Narrow viewport
Header, form, counters, queue, and footer remain readable and usable.




A useful FIFO sequence is:

Plain Text


Add A, Add B, Add C
Board -> A
Add D
Board -> B
Board -> C
Board -> D



Project Structure

Plain Text


src/
  components/
    Footer.tsx
    Header.tsx
    NowBoarding.tsx
    QueueEntryCard.tsx
    QueueForm.tsx
    QueueList.tsx
    QueueSummary.tsx
    RecentlyBoarded.tsx
  types/
    queue.ts
  App.tsx
  index.css
public/
  initial-queue.json



Styling Direction

The stylesheet is built specifically for a live queue/status board. It uses a dark operations-board palette, cyan live-state signals, yellow boarding emphasis, monospace operational labels, a prominent Now Boarding panel, and responsive layout rules. It is intentionally not styled as a generic list-and-filter dashboard.

Commit Workflow

Each completed requirement should be tested and committed separately. Example commit messages include:

Bash


git add src/App.tsx src/components/QueueForm.tsx
git commit -m "feat: add groups to the ride queue"



Bash


git add src/App.tsx src/components/RecentlyBoarded.tsx

git commit -m "feat: show recent boarded groups"



Before committing, verify the relevant interaction manually and run:

Bash


npm run build



