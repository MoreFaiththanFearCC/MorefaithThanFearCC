
import React from 'react';
import { ICONS } from '../constants';

interface PipelineBoardProps {
  title: string;
  stages: string[];
  items: any[];
  renderCard: (item: any) => React.ReactNode;
}

const PipelineBoard: React.FC<PipelineBoardProps> = ({ title, stages, items, renderCard }) => {
  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>
          <button className="bg-sky-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm flex items-center gap-2">
            <ICONS.Plus /> New Item
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-x-auto gap-4 pb-4 min-h-0">
        {stages.map((stage) => {
          const stageItems = items.filter(item => item.stage === stage);
          return (
            <div key={stage} className="flex-shrink-0 w-80 bg-slate-100/50 rounded-xl flex flex-col max-h-full">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-700 text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                    {stage}
                  </h3>
                  <span className="bg-slate-200 text-slate-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {stageItems.length}
                  </span>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-3 custom-scrollbar">
                {stageItems.map((item) => (
                  <div key={item.id}>
                    {renderCard(item)}
                  </div>
                ))}
                {stageItems.length === 0 && (
                  <div className="h-24 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-xs italic">
                    No active items
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineBoard;
