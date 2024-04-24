import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";

export default function App() {
  const [playersIn, setPlayersIn] = React.useState(["Izzy"]);
  const [playersOut, setPlayersOut] = React.useState([]);
  // const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div>
        <h2>IN</h2>
        <Droppable id="in">
          {playersIn.map((element) => (
            <Draggable key={element} id={element}>
              {element}
            </Draggable>
          ))}
          {playersIn.length === 0 ? "drop here" : null}
        </Droppable>
      </div>
      <div>
        <h2>OUT</h2>
        <Droppable id="out">
          {playersOut.map((element) => (
            <Draggable key={element} id={element}>
              {element}
            </Draggable>
          ))}
          {playersOut.length === 0 ? "drop here" : null}
        </Droppable>
      </div>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { over, active } = event;
    if (over?.id === "out") {
      setPlayersOut((current) => [...current, active.id]);
      setPlayersIn((current) => current.filter((name) => name !== active.id));
    }

    if (over?.id === "in") {
      setPlayersIn((current) => [...current, active.id]);
      setPlayersOut((current) => current.filter((name) => name !== active.id));
    }
  }
}
