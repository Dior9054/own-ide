
import { useEffect, useState } from "react";

export default function App() {
  const [state, setState] = useState(true)
  const [side, setSide] = useState(true)
  const [pos, setPos] = useState<any>({
    down: false,
    content: false,
    x: 0,
    y: 0,
    w: 0,
    h: 0
  })
  const [innerWidth, setInnerWidth] = useState(JSON.parse(localStorage.getItem("innerWidth") as any) ?? { width: 100, height: 100 })

  useEffect(() => {
    localStorage.setItem("innerWidth", JSON.stringify(innerWidth))
  }, [innerWidth])

  return (
    <div className="w-[100%] h-[100vh] bg-slate-950">
      <div className={`flex gap-[10px] z-[8] fixed top-[0] left-[0] w-[100%] min-h-[50px] max-h-[50px] h-[50px] px-[30px] border-b border-solid border-b-[#495057] bg-[#212529] duration-200 transition-[transform] ${state ? "" : " translate-y-[-100%]"}`}>
        <button className="max-w-[24px] min-w-[24px] max-h-[24px] min-h-[24px] rounded-[50%] absolute bottom-[-25%] left-[0] p-[2px] cursor-pointer bg-[black] border border-solid border-[#495057]" onClick={() => setState(prev => !prev)}>
          <svg viewBox="0 0 24 24" className={`fill-[white] max-w-[100%] min-w-[100%] max-h-[100%] min-h-[100%] duration-200 transition-[transform] ${state ? "" : " rotate-[180deg]"}`}>
            <path d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z" />
          </svg>
        </button>
        <div className="flex flex-col gap-[2px] w-[max-content]">
          <p className="text-[12px] text-[#adb5bd] font-sans">content width</p>
          <input type="number" value={innerWidth.width} onChange={(e: any) => setInnerWidth((prev: any) => {
            return {
              ...prev,
              width: +e.target.value
            }
          })} className="w-[70px] h-[20px] px-[3px]" />
        </div>
        <div className="flex flex-col gap-[2px] w-[max-content]">
          <p className="text-[12px] text-[#adb5bd] font-sans">content height</p>
          <input type="number" value={innerWidth.height} onChange={(e: any) => setInnerWidth((prev: any) => {
            return {
              ...prev,
              height: +e.target.value
            }
          })} className="w-[70px] h-[20px] px-[3px]" />
        </div>
      </div>


      <div className={`flex flex-col z-[9] gap-[10px] fixed top-[0] right-[0] w-[50px] max-w-[50px] min-w-[50px] min-h-[100vh] max-h-[100vh] h-[100vh] border-l border-solid border-l-[#495057] bg-[#212529] duration-200 transition-[transform] ${side ? "" : " translate-x-[100%]"}`}>
        <button className="max-w-[24px] min-w-[24px] max-h-[24px] min-h-[24px] rounded-[50%] absolute left-[-25%] top-[70px] p-[2px] cursor-pointer bg-[black] border border-solid border-[#495057]" onClick={() => setSide(prev => !prev)}>
          <svg viewBox="0 0 24 24" className={`fill-[white] max-w-[100%] min-w-[100%] max-h-[100%] min-h-[100%] duration-200 transition-[transform] ${side ? "rotate-[90deg]" : " rotate-[-90deg]"}`}>
            <path d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z" />
          </svg>
        </button>
        <div className="flex flex-col gap-[2px] w-[max-content]">
          <p className="text-[11px] text-[#adb5bd] font-sans">W:</p>
          <input type="text" value={pos.w} onChange={(e: any) => setPos((prev: any) => {
            if (e.target.value === "100%") {
              return {
                ...prev,
                w: "100%"
              }
            } else {
              return {
                ...prev,
                w: +e.target.value
              }
            }
          })} className="w-[100%] h-[20px] px-[3px]" />
        </div>
        <div className="flex flex-col gap-[2px] w-[max-content]">
          <p className="text-[11px] text-[#adb5bd] font-sans">H:</p>
          <input type="text" value={pos.h} onChange={(e: any) => setPos((prev: any) => {
            if (e.target.value === "100%") {
              return {
                ...prev,
                h: "100%"
              }
            } else {
              return {
                ...prev,
                h: +e.target.value
              }
            }
          })} className="w-[100%] h-[20px] px-[3px]" />
        </div>
        <div className="flex flex-col gap-[2px] w-[max-content]">
          <p className="text-[11px] text-[#adb5bd] font-sans">X:</p>
          <input type="number" value={pos.x} onChange={(e: any) => setPos((prev: any) => {
            return {
              ...prev,
              x: +e.target.value
            }
          })} className="w-[100%] h-[20px] px-[3px]" />
        </div>
        <div className="flex flex-col gap-[2px] w-[max-content]">
          <p className="text-[11px] text-[#adb5bd] font-sans">Y:</p>
          <input type="number" value={pos.y} onChange={(e: any) => setPos((prev: any) => {
            return {
              ...prev,
              y: +e.target.value
            }
          })} className="w-[100%] h-[20px] px-[3px]" />
        </div>
        <div className="flex flex-col gap-[2px] w-[max-content]">
          <p className="text-[11px] text-[#adb5bd] font-sans">Content:</p>
          <input type="checkbox" onChange={(e: any) => {
            setPos((prev: any) => {
              return {
                ...prev,
                content: e.target.checked
              }
            })
          }} className="w-[100%] h-[20px] px-[3px]" />
        </div>
      </div>


      <div
        className="w-[100%] h-[100%] py-[100px] overflow-auto no-scroll"
        onMouseDown={(e: any) => {
          if (!pos.content) {
            setPos((prev: any) => {
              return {
                ...prev,
                x: e.clientX,
                y: e.clientY,
                down: true
              }
            })
          }
        }}
        onMouseMove={(e: any) => {
          if (!pos.content) {
            if (pos.down) {
              setPos((prev: any) => {
                return {
                  ...prev,
                  w: e.clientX - pos.x,
                  h: e.clientY - pos.y,
                  down: true
                }
              })
            }
          }
        }}
        onMouseUp={() => {
          if (!pos.content) {
            setPos((prev: any) => {
              return {
                ...prev,
                down: false
              }
            })
          }
        }}
      >
        <div
          className="w-[100%] h-[100%] bg-[white] mx-auto duration-200 transition-[width, height] relative" style={{ width: innerWidth.width, height: innerWidth.height }}
          onMouseDown={(e: any) => {
            if (pos.content) {
              setPos((prev: any) => {
                return {
                  ...prev,
                  x: e.clientX - e.target.offsetLeft,
                  y: e.clientY - e.target.offsetTop,
                  down: true,
                  w: 0,
                  h: 0
                }
              })
            }
          }}
          onMouseMove={(e: any) => {
            if (pos.content) {
              if (pos.down) {
                setPos((prev: any) => {
                  return {
                    ...prev,
                    w: e.clientX - pos.x,
                    h: e.clientY - pos.y,
                    down: true
                  }
                })
              }
            }
          }}
          onMouseUp={() => {
            if (pos.content) {
              setPos((prev: any) => {
                return {
                  ...prev,
                  down: false
                }
              })
            }
          }}
        >
          <div className={`w-[100px] h-[100px] top-[0] left-[0] bg-[red] ${pos.content ? "absolute" : "fixed"}`} style={{ left: pos.x, top: pos.y, width: pos.w, height: pos.h }}>

          </div>
        </div>
      </div>


    </div>
  );
}
