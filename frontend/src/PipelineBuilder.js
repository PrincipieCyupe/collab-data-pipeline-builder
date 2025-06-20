import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const DraggableTool = ({ id, label }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.6 : 1,
    cursor: "grab",
    userSelect: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-gray-800 text-gray-200 p-3 rounded shadow mb-3 select-none hover:shadow-lg transition-shadow"
    >
      {label}
    </div>
  );
};

const DroppableCanvas = ({ isOver, children }) => {
  return (
    <div
      id="canvas"
      className={`w-full h-full border-2 border-dashed rounded-lg p-6 transition-colors
        flex flex-col items-center justify-center text-gray-400
        ${
          isOver
            ? "border-cyan-400 bg-gray-900"
            : "border-gray-600 bg-gray-850"
        }`}
      style={{ minHeight: "300px" }}
    >
      {children}
    </div>
  );
};

const PipelineBuilder = () => {
  const [pipelineItems, setPipelineItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("pipelineItems");
    if (saved) {
      try {
        setPipelineItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved pipeline:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pipelineItems", JSON.stringify(pipelineItems));
  }, [pipelineItems]);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over && over.id === "canvas") {
      if (!pipelineItems.includes(active.id)) {
        setPipelineItems((items) => [...items, active.id]);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleClear = () => {
    setPipelineItems([]);
  };

  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-gray-900 shadow-md text-gray-200">
        <h1 className="text-2xl font-bold">Collaborative Data Pipeline Builder</h1>
        <div>
          <button
            onClick={handleClear}
            disabled={pipelineItems.length === 0}
            className={`mr-3 px-4 py-2 rounded transition-colors
              ${
                pipelineItems.length === 0
                  ? "bg-gray-700 cursor-not-allowed text-gray-400"
                  : "bg-yellow-500 hover:bg-yellow-600 text-gray-900"
              }`}
          >
            Clear Pipeline
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 transition-colors"
          >
            Log Out
          </button>
        </div>
      </header>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex h-[calc(100vh-64px)] bg-gray-900">
          <aside className="w-1/4 bg-gray-800 p-6 overflow-y-auto text-gray-200">
            <h2 className="text-xl font-semibold mb-6">Tools</h2>
            <DraggableTool id="data-source" label="Data Source" />
            <DraggableTool id="transform" label="Transform" />
            <DraggableTool id="output" label="Output" />
          </aside>

          <main ref={setNodeRef} className="flex-1 p-6 border-l border-gray-700 overflow-auto">
            <DroppableCanvas isOver={isOver}>
              {pipelineItems.length === 0 ? (
                <p className="italic text-gray-500 text-center mt-20 px-4">
                  Drag tools from the left sidebar here to build your pipeline.
                </p>
              ) : (
                pipelineItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-cyan-700 border border-cyan-500 p-4 rounded mb-4 shadow-sm text-gray-100"
                  >
                    {item}
                  </div>
                ))
              )}
            </DroppableCanvas>
          </main>
        </div>
      </DndContext>
    </>
  );
};

export default PipelineBuilder;

