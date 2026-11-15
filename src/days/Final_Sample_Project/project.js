
import React, {
  createContext,
  use,
  useState,
  useEffect,
  useContext,
  useReducer,
  useRef,
  useMemo,
  useCallback,
  useTransition,
  useOptimistic,
  useActionState,
  Suspense,
  lazy,
  memo,
} from "react";

import { createPortal } from "react-dom";

// ==========================================
// 1. INITIAL WEBSITE COMPONENT CONFIGURATION
// ==========================================

const initialBlocks = [
  {
    id: 1,
    type: "heading",
    content: "Build Something Amazing",
    color: "#ffffff",
    background: "#0f172a",
    fontSize: "36px",
  },
  {
    id: 2,
    type: "text",
    content:
      "Create beautiful websites with our simple drag-and-edit builder.",
    color: "#cbd5e1",
    background: "#0f172a",
    fontSize: "16px",
  },
  {
    id: 3,
    type: "button",
    content: "Get Started",
    color: "#ffffff",
    background: "#0891b2",
    fontSize: "16px",
  },
  {
    id: 4,
    type: "card",
    content: "Create. Design. Publish.",
    color: "#ffffff",
    background: "#1e293b",
    fontSize: "20px",
  },
];

// ==========================================
// 2. CONTEXT
// ==========================================

const EditorContext = createContext(null);

function useEditor() {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("useEditor must be used inside EditorContext.Provider");
  }

  return context;
}

// ==========================================
// 3. REDUCER
// ==========================================

function editorReducer(state, action) {
  switch (action.type) {
    case "ADD_BLOCK":
      return [...state, action.block];

    case "UPDATE_BLOCK":
      return state.map((block) =>
        block.id === action.id
          ? { ...block, ...action.updates }
          : block
      );

    case "DELETE_BLOCK":
      return state.filter((block) => block.id !== action.id);

    case "MOVE_BLOCK": {
      const index = state.findIndex(
        (block) => block.id === action.id
      );

      const newIndex = index + action.direction;

      if (
        index === -1 ||
        newIndex < 0 ||
        newIndex >= state.length
      ) {
        return state;
      }

      const updated = [...state];
      [updated[index], updated[newIndex]] = [
        updated[newIndex],
        updated[index],
      ];

      return updated;
    }

    case "LOAD_BLOCKS":
      return action.blocks;

    default:
      return state;
  }
}

// ==========================================
// 4. CUSTOM HOOK
// ==========================================

function useWebsiteStats(blocks) {
  return useMemo(() => {
    return {
      totalBlocks: blocks.length,
      headings: blocks.filter((b) => b.type === "heading").length,
      buttons: blocks.filter((b) => b.type === "button").length,
      textLength: blocks.reduce(
        (total, block) => total + block.content.length,
        0
      ),
    };
  }, [blocks]);
}

// ==========================================
// 5. PROMISE DATA FOR use()
// ==========================================

const templatePromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve([
      "Portfolio Website",
      "Business Landing Page",
      "Personal Blog",
      "Product Website",
    ]);
  }, 1000);
});

function TemplateLibrary() {
  const templates = use(templatePromise);

  return (
    <div className="space-y-2">
      {templates.map((template) => (
        <div
          key={template}
          className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-sm text-slate-300"
        >
          ✨ {template}
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 6. LAZY LOADED SETTINGS PANEL
// ==========================================

const LazySettingsPanel = lazy(() =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        default: function SettingsPanel() {
          return (
            <div className="rounded-xl border border-cyan-500/20 bg-slate-800 p-4">
              <h3 className="mb-2 font-bold text-white">
                Advanced Settings
              </h3>
              <p className="text-sm text-slate-400">
                This panel is loaded on demand using React.lazy().
              </p>
              <p className="mt-2 text-xs text-cyan-400">
                Lazy module loaded successfully.
              </p>
            </div>
          );
        },
      });
    }, 500);
  })
);

// ==========================================
// 7. ERROR BOUNDARY
// ==========================================

class EditorErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-red-300">
          <h2 className="font-bold">Something went wrong!</h2>
          <p className="mt-2 text-sm">
            The editor could not render this section.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

// ==========================================
// 8. MEMOIZED WEBSITE BLOCK
// ==========================================

const WebsiteBlock = memo(function WebsiteBlock({
  block,
  selected,
  onSelect,
}) {
  const commonStyle = {
    color: block.color,
    backgroundColor: block.background,
    fontSize: block.fontSize,
  };

  return (
    <div
      onClick={() => onSelect(block.id)}
      style={commonStyle}
      className={`my-3 cursor-pointer rounded-xl border p-5 transition ${
        selected
          ? "border-cyan-400 ring-2 ring-cyan-400/30"
          : "border-transparent hover:border-cyan-400/40"
      }`}
    >
      {block.type === "heading" && (
        <h1 className="font-black">{block.content}</h1>
      )}

      {block.type === "text" && (
        <p className="leading-7">{block.content}</p>
      )}

      {block.type === "button" && (
        <button
          type="button"
          className="rounded-lg px-6 py-3 font-bold shadow-lg"
          style={{
            color: block.color,
            backgroundColor: block.background,
          }}
        >
          {block.content}
        </button>
      )}

      {block.type === "card" && (
        <div className="rounded-xl border border-white/10 p-8 text-center">
          <h2 className="font-bold">{block.content}</h2>
        </div>
      )}
    </div>
  );
});

// ==========================================
// 9. LOADING COMPONENT
// ==========================================

function Loading() {
  return (
    <div className="flex items-center justify-center gap-3 py-5 text-cyan-400">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-400/30 border-t-cyan-400" />
      Loading...
    </div>
  );
}

// ==========================================
// 10. MAIN EDITOR COMPONENT
// ==========================================

function EditorWorkspace() {
  const {
    blocks,
    dispatch,
    selectedId,
    setSelectedId,
  } = useEditor();

  const [activeTab, setActiveTab] = useState("elements");
  const [showPreview, setShowPreview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [websiteName, setWebsiteName] = useState("My Website");

  const textInputRef = useRef(null);

  const selectedBlock = blocks.find(
    (block) => block.id === selectedId
  );

  // useMemo: optimize statistics calculation
  const stats = useWebsiteStats(blocks);

  // useCallback: reusable stable callback
  const handleSelect = useCallback(
    (id) => {
      setSelectedId(id);
    },
    [setSelectedId]
  );

  // useEffect: synchronize editor with localStorage
  useEffect(() => {
    localStorage.setItem("webcraft-blocks", JSON.stringify(blocks));
  }, [blocks]);

  // Focus the text input when an element is selected
  useEffect(() => {
    if (selectedBlock && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [selectedId]);

  // useTransition and useOptimistic
  const [isPending, startTransition] = useTransition();

  const [optimisticBlocks, addOptimistic] = useOptimistic(
    blocks,
    (currentBlocks, action) => {
      if (action.type === "ADD_BLOCK") {
        return [...currentBlocks, action.block];
      }

      return currentBlocks;
    }
  );

  function addBlock(type) {
    const configurations = {
      heading: {
        content: "New Heading",
        fontSize: "30px",
        color: "#ffffff",
        background: "#0f172a",
      },
      text: {
        content: "Write your content here...",
        fontSize: "16px",
        color: "#cbd5e1",
        background: "#0f172a",
      },
      button: {
        content: "Click Me",
        fontSize: "16px",
        color: "#ffffff",
        background: "#0891b2",
      },
      card: {
        content: "New Card",
        fontSize: "20px",
        color: "#ffffff",
        background: "#1e293b",
      },
    };

    const newBlock = {
      id: Date.now(),
      type,
      ...configurations[type],
    };

    startTransition(async () => {
      addOptimistic({
        type: "ADD_BLOCK",
        block: newBlock,
      });

      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      dispatch({
        type: "ADD_BLOCK",
        block: newBlock,
      });

      setSelectedId(newBlock.id);
    });
  }

  function updateSelected(updates) {
    if (!selectedId) return;

    dispatch({
      type: "UPDATE_BLOCK",
      id: selectedId,
      updates,
    });
  }

  function deleteSelected() {
    if (!selectedId) return;

    dispatch({
      type: "DELETE_BLOCK",
      id: selectedId,
    });

    setSelectedId(null);
  }

  // useActionState: asynchronous save action
  async function saveWebsite(previousState, formData) {
    const name = formData.get("websiteName")?.trim();

    if (!name) {
      return {
        message: "Please enter a website name.",
        success: false,
      };
    }

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    localStorage.setItem("webcraft-name", name);
    localStorage.setItem(
      "webcraft-blocks",
      JSON.stringify(blocks)
    );

    return {
      message: "Website saved successfully!",
      success: true,
    };
  }

  const [saveState, saveAction, isSaving] = useActionState(
    saveWebsite,
    { message: "", success: false }
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* TOP NAVBAR */}

      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-900 px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight">
              <span className="text-cyan-400">WEB</span>
              CRAFT
              <span className="ml-2">✦</span>
            </h1>
            <p className="text-xs text-slate-500">
              Visual Website Builder
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="hidden text-xs text-slate-400 sm:block">
              {isPending ? "Updating..." : "All changes synced"}
            </span>

            <button
              onClick={() => setShowPreview(true)}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
            >
              Preview
            </button>

            <button
              onClick={() => setShowSettings(true)}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
            >
              Settings
            </button>

            <form action={saveAction}>
              <input
                type="hidden"
                name="websiteName"
                value={websiteName}
              />

              <button
                type="submit"
                disabled={isSaving}
                className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400 disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Website"}
              </button>
            </form>
          </div>
        </div>

        {saveState.message && (
          <p
            className={`mx-auto mt-3 max-w-7xl text-sm ${
              saveState.success
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {saveState.message}
          </p>
        )}
      </header>

      {/* MAIN EDITOR */}

      <main className="mx-auto grid max-w-7xl gap-5 p-4 lg:grid-cols-12">
        {/* LEFT SIDEBAR */}

        <aside className="space-y-5 lg:col-span-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <h2 className="mb-4 font-bold">Website Details</h2>

            <label className="mb-2 block text-xs text-slate-400">
              Website Name
            </label>

            <input
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm outline-none focus:border-cyan-400"
              placeholder="Enter website name"
            />

            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-slate-800 p-3">
                <p className="text-xl font-bold text-cyan-400">
                  {stats.totalBlocks}
                </p>
                <p className="text-xs text-slate-500">
                  Elements
                </p>
              </div>

              <div className="rounded-lg bg-slate-800 p-3">
                <p className="text-xl font-bold text-cyan-400">
                  {stats.textLength}
                </p>
                <p className="text-xs text-slate-500">
                  Characters
                </p>
              </div>
            </div>
          </div>

          {/* ELEMENTS PANEL */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <div className="mb-4 flex gap-2">
              <button
                onClick={() => setActiveTab("elements")}
                className={`flex-1 rounded-lg p-2 text-sm ${
                  activeTab === "elements"
                    ? "bg-cyan-500 text-slate-950"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                Elements
              </button>

              <button
                onClick={() => setActiveTab("templates")}
                className={`flex-1 rounded-lg p-2 text-sm ${
                  activeTab === "templates"
                    ? "bg-cyan-500 text-slate-950"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                Templates
              </button>
            </div>

            {activeTab === "elements" ? (
              <div className="grid grid-cols-2 gap-2">
                {[
                  ["heading", "T Heading"],
                  ["text", "≡ Text"],
                  ["button", "▢ Button"],
                  ["card", "▣ Card"],
                ].map(([type, label]) => (
                  <button
                    key={type}
                    onClick={() => addBlock(type)}
                    className="rounded-xl border border-slate-700 bg-slate-800 p-4 text-sm transition hover:border-cyan-400 hover:bg-slate-700"
                  >
                    <span className="block text-lg text-cyan-400">
                      +
                    </span>
                    {label}
                  </button>
                ))}
              </div>
            ) : (
              <Suspense fallback={<Loading />}>
                <TemplateLibrary />
              </Suspense>
            )}
          </div>

          {/* ADVANCED SETTINGS */}

          <Suspense fallback={<Loading />}>
            <LazySettingsPanel />
          </Suspense>
        </aside>

        {/* WEBSITE CANVAS */}

        <section className="min-h-[600px] rounded-2xl border border-slate-800 bg-slate-900 p-4 lg:col-span-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold">Website Canvas</h2>
              <p className="text-xs text-slate-500">
                Select an element to edit it
              </p>
            </div>

            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
              Live Editor
            </span>
          </div>

          <div className="min-h-[500px] overflow-hidden rounded-xl bg-slate-950 p-5">
            {/* Website preview */}

            <div className="mx-auto max-w-xl">
              <div className="mb-8 border-b border-slate-800 pb-4">
                <h2 className="text-lg font-black">
                  {websiteName}
                </h2>
              </div>

              {optimisticBlocks.map((block, index) => (
                <div key={block.id}>
                  <EditorErrorBoundary>
                    <WebsiteBlock
                      block={block}
                      selected={selectedId === block.id}
                      onSelect={handleSelect}
                    />
                  </EditorErrorBoundary>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() =>
                        dispatch({
                          type: "MOVE_BLOCK",
                          id: block.id,
                          direction: -1,
                        })
                      }
                      disabled={index === 0}
                      className="text-xs text-slate-500 hover:text-cyan-400 disabled:opacity-30"
                    >
                      ↑ Move
                    </button>

                    <button
                      onClick={() =>
                        dispatch({
                          type: "MOVE_BLOCK",
                          id: block.id,
                          direction: 1,
                        })
                      }
                      disabled={index === optimisticBlocks.length - 1}
                      className="text-xs text-slate-500 hover:text-cyan-400 disabled:opacity-30"
                    >
                      ↓ Move
                    </button>
                  </div>
                </div>
              ))}

              {optimisticBlocks.length === 0 && (
                <div className="py-24 text-center">
                  <p className="text-4xl">🎨</p>
                  <p className="mt-4 text-slate-400">
                    Your canvas is empty.
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Add an element from the left panel.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* RIGHT SIDEBAR: PROPERTIES */}

        <aside className="rounded-2xl border border-slate-800 bg-slate-900 p-4 lg:col-span-3">
          <h2 className="mb-5 font-bold">Element Properties</h2>

          {selectedBlock ? (
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-xs text-slate-400">
                  Element Type
                </label>

                <div className="rounded-lg bg-slate-800 p-3 text-sm capitalize text-cyan-400">
                  {selectedBlock.type}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs text-slate-400">
                  Content
                </label>

                <textarea
                  ref={textInputRef}
                  value={selectedBlock.content}
                  onChange={(e) =>
                    updateSelected({ content: e.target.value })
                  }
                  rows={4}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-slate-400">
                  Text Color
                </label>

                <input
                  type="color"
                  value={selectedBlock.color}
                  onChange={(e) =>
                    updateSelected({ color: e.target.value })
                  }
                  className="h-11 w-full cursor-pointer rounded-lg bg-slate-800 p-1"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-slate-400">
                  Background Color
                </label>

                <input
                  type="color"
                  value={selectedBlock.background}
                  onChange={(e) =>
                    updateSelected({ background: e.target.value })
                  }
                  className="h-11 w-full cursor-pointer rounded-lg bg-slate-800 p-1"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-slate-400">
                  Font Size
                </label>

                <select
                  value={selectedBlock.fontSize}
                  onChange={(e) =>
                    updateSelected({ fontSize: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm outline-none"
                >
                  <option value="14px">Small</option>
                  <option value="16px">Normal</option>
                  <option value="20px">Large</option>
                  <option value="30px">Extra Large</option>
                  <option value="36px">Heading</option>
                </select>
              </div>

              <button
                onClick={deleteSelected}
                className="w-full rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm font-bold text-red-400 hover:bg-red-500/20"
              >
                Delete Element
              </button>
            </div>
          ) : (
            <div className="rounded-xl bg-slate-800 p-6 text-center">
              <p className="text-3xl">👆</p>
              <p className="mt-3 text-sm text-slate-400">
                Select an element to edit its properties.
              </p>
            </div>
          )}

          {/* QUICK STATISTICS */}

          <div className="mt-8 border-t border-slate-800 pt-5">
            <h3 className="mb-3 text-sm font-bold">
              Website Statistics
            </h3>

            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex justify-between">
                <span>Headings</span>
                <span>{stats.headings}</span>
              </div>

              <div className="flex justify-between">
                <span>Buttons</span>
                <span>{stats.buttons}</span>
              </div>

              <div className="flex justify-between">
                <span>Total Elements</span>
                <span>{stats.totalBlocks}</span>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* PREVIEW MODAL USING PORTAL */}

      {showPreview &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-black">
                  {websiteName} – Preview
                </h2>

                <button
                  onClick={() => setShowPreview(false)}
                  className="rounded-lg bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700"
                >
                  ✕ Close
                </button>
              </div>

              <div className="rounded-xl bg-slate-950 p-5">
                {blocks.map((block) => (
                  <div
                    key={block.id}
                    style={{
                      color: block.color,
                      backgroundColor: block.background,
                      fontSize: block.fontSize,
                    }}
                    className="my-3 rounded-xl p-5"
                  >
                    {block.type === "heading" && (
                      <h1 className="font-black">{block.content}</h1>
                    )}

                    {block.type === "text" && (
                      <p>{block.content}</p>
                    )}

                    {block.type === "button" && (
                      <button className="rounded-lg px-6 py-3 font-bold">
                        {block.content}
                      </button>
                    )}

                    {block.type === "card" && (
                      <div className="rounded-xl border border-white/10 p-8 text-center">
                        {block.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* SETTINGS MODAL USING PORTAL */}

      {showSettings &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold">Editor Settings</h2>

                <button
                  onClick={() => setShowSettings(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-slate-400">
                Manage your website editor.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-lg bg-slate-800 p-3 text-sm">
                  Website: {websiteName}
                </div>

                <div className="rounded-lg bg-slate-800 p-3 text-sm">
                  Total elements: {stats.totalBlocks}
                </div>

                <button
                  onClick={() => {
                    localStorage.removeItem("webcraft-blocks");
                    dispatch({
                      type: "LOAD_BLOCKS",
                      blocks: initialBlocks,
                    });
                    setSelectedId(null);
                  }}
                  className="w-full rounded-lg bg-red-500/10 p-3 text-sm font-bold text-red-400 hover:bg-red-500/20"
                >
                  Reset Website
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* FOOTER */}

      <footer className="border-t border-slate-800 px-5 py-6 text-center text-xs text-slate-600">
        WebCraft Website Builder · React 19 · Tailwind CSS v4
      </footer>
    </div>
  );
}

// ==========================================
// 11. ROOT APP COMPONENT
// ==========================================

export default function App() {
  const [blocks, dispatch] = useReducer(
    editorReducer,
    initialBlocks
  );

  const [selectedId, setSelectedId] = useState(1);

  const contextValue = useMemo(
    () => ({
      blocks,
      dispatch,
      selectedId,
      setSelectedId,
    }),
    [blocks, selectedId]
  );

  return (
    <EditorContext.Provider value={contextValue}>
      <EditorWorkspace />
    </EditorContext.Provider>
  );
}
