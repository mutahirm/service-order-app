import React, { useState } from 'react';
import { 
  Car, 
  User, 
  Wrench, 
  MapPin, 
  Phone, 
  Mail,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

const App = () => {
  const views = ['Repair Order', 'Technician Copy', 'Customer Estimate', 'Final Invoice', 'Internal Copy'];
  const [view, setView] = useState('Repair Order');
  const brandColor = "#10CFC9";

  // Mock data reflecting the full lifecycle of a repair
  const data = {
    customer: {
      name: "Justin Moroz",
      address: "123 Placeholder Avenue, Suite 4B", // Placeholder address
      city: "Regina, SK S4W 0H7",
    },
    vehicle: {
      year: "2006",
      make: "GMC",
      model: "Sierra 1500",
      vin: "2GTEK13T861318344",
      odometer: "219,655 km",
      tag: "T8344",
    },
    service: {
      opened: "Nov 25, 2019 • 17:01",
      ready: "Nov 28, 2019 • 15:39",
    },
    shop: {
      laborRate: 130.00,
      taxRate: 0.11 // 11% combined GST/PST for example
    },
    items: [
      {
        id: 1,
        type: "concern", // Initial concern
        code: "08HYZZ006",
        description: "Customer requests Oil and Filter Change",
        techNotes: "Performed oil change, filled with 5W-30 full synthetic.",
        technician: "4821",
        laborHours: 0.5,
        partCost: 18.50,
        partSell: 35.00,
        status: "approved"
      },
      {
        id: 2,
        type: "concern", // Initial concern
        code: "DIAG-BRK",
        description: "Customer states brakes are grinding when stopping",
        techNotes: "Inspected. Front pads are at 2mm, rotors are heavily scored and cannot be machined.",
        technician: "4821",
        laborHours: 0.5,
        partCost: 0.00,
        partSell: 0.00,
        status: "approved"
      },
      {
        id: 3,
        type: "upsell", // Found during inspection
        code: "BRK-F-REP",
        description: "Replace Front Brake Pads and Rotors (Recommended)",
        techNotes: "Replaced front pads and rotors, bedded in brakes. Road tested.",
        technician: "4821",
        laborHours: 1.5,
        partCost: 85.00,
        partSell: 160.00,
        status: "approved"
      },
      {
        id: 4,
        type: "upsell", // Found during inspection
        code: "FLT-CABIN",
        description: "Replace Cabin Air Filter",
        techNotes: "Cabin filter is extremely dirty and filled with leaves/debris.",
        technician: "4821",
        laborHours: 0.2,
        partCost: 12.00,
        partSell: 28.00,
        status: "declined"
      }
    ]
  };

  // Helper to calculate totals based on which items are currently visible/active
  const getTotals = (visibleItems) => {
    let labor = 0;
    let partsSell = 0;
    let partsCost = 0;

    visibleItems.forEach(item => {
      labor += (item.laborHours * data.shop.laborRate);
      partsSell += item.partSell;
      partsCost += item.partCost;
    });

    const misc = labor * 0.05; // 5% of labor for shop supplies
    const subtotal = labor + partsSell + misc;
    const tax = subtotal * data.shop.taxRate;
    
    return {
      labor,
      partsSell,
      partsCost,
      misc,
      subtotal,
      tax,
      total: subtotal + tax,
      profit: subtotal - partsCost - (labor * 0.3) // Mocking a 30% tech cost for internal profit display
    };
  };

  // Determine which items to show based on the selected view
  let displayItems = [];
  if (view === 'Repair Order') {
    displayItems = data.items.filter(i => i.type === 'concern'); // Only initial concerns
  } else if (view === 'Final Invoice') {
    displayItems = data.items.filter(i => i.status === 'approved'); // Only approved items
  } else {
    displayItems = data.items; // Tech Copy, Estimate, and Internal see everything
  }

  const totals = getTotals(view === 'Customer Estimate' ? data.items : displayItems);

  const Header = () => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b pb-6">
      <div>
        <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 39.22" className="h-12 w-auto mb-3">
          <g id="Layer_1-2" data-name="Layer 1">
            <g>
              <polygon fill="#231f20" points="46.17 24.26 42.51 14.23 46.15 14.23 47.86 19.94 48.25 21.42 48.42 21.42 48.65 20.43 50.41 14.23 54.34 14.23 56.2 20.43 56.51 21.42 56.68 21.42 57.07 19.94 58.63 14.23 62.22 14.23 62.05 15.25 58.52 24.26 54.59 24.26 52.78 18.74 52.44 17.3 52.27 17.3 51.94 18.74 50.15 24.26 46.17 24.26"/>
              <path fill="#231f20" d="M66.52,24.26c-1.21,0-2.09-.27-2.64-.81-.55-.54-.83-1.4-.83-2.59v-3.26c0-1.16.27-2.02.82-2.56.55-.55,1.43-.82,2.65-.82h4.99c1.2,0,2.07.27,2.62.82.55.55.83,1.4.83,2.56v3.26c0,1.19-.28,2.05-.84,2.59-.56.54-1.43.81-2.61.81h-4.99ZM67.7,21.94h2.65c.89,0,1.33-.4,1.33-1.21v-2.99c0-.8-.45-1.2-1.33-1.2h-2.65c-.46,0-.8.09-1.03.27-.23.18-.34.49-.34.92v2.99c0,.42.11.73.34.92.23.19.57.29,1.03.29"/>
              <path fill="#231f20" d="M77.17,24.26l.17-1.37v-8.68h3.28v7.71h6.05l1.03,2.15s-.15.09-.46.13c-.31.04-.84.06-1.59.06h-8.48Z"/>
              <path fill="#231f20" d="M88.88,24.26v-8.68l-.17-1.37h7.93c1.38,0,2.41.27,3.1.82.69.55,1.03,1.4,1.03,2.56v3.26c0,1.19-.34,2.05-1.03,2.59-.68.54-1.72.81-3.11.81h-7.76ZM92.21,21.9h3.91c.88,0,1.32-.4,1.33-1.21v-2.96c0-.33-.1-.61-.29-.85-.2-.23-.54-.35-1.04-.35h-3.91v5.37Z"/>
              <path fill="#231f20" d="M106.02,24.43c-1.14,0-2-.27-2.59-.8-.59-.54-.88-1.4-.88-2.6v-6.82h3.33v6.51c0,.54.13.89.39,1.08.26.18.59.27.98.27h2.2c.36,0,.68-.09.96-.28.27-.19.41-.54.41-1.07v-6.51h3.28v6.82c0,1.2-.29,2.06-.86,2.6-.58.54-1.44.8-2.59.8h-4.63Z"/>
              <path fill="#231f20" d="M121.55,24.26c-.78,0-1.34-.03-1.71-.1-.37-.07-.55-.15-.55-.24l1.03-2.2c.26.05.8.09,1.62.13.82.04,1.89.06,3.2.06h1.35c.4,0,.67-.06.8-.17.14-.11.21-.28.21-.5v-.17c0-.27-.07-.46-.21-.56-.14-.1-.4-.15-.8-.15h-3.91c-1.15,0-1.99-.21-2.51-.64-.52-.43-.79-1.12-.79-2.09v-.62c0-.5.09-.96.28-1.38.19-.42.51-.76.97-1.02.46-.26,1.08-.39,1.88-.39h5.67c.69,0,1.27.04,1.73.12.46.08.69.17.69.26l-.51,2.12c-.32-.03-.92-.07-1.8-.11-.88-.04-2-.06-3.36-.06l-1.23-.02c-.35,0-.6.05-.75.15-.15.1-.23.28-.24.54v.12c0,.26.08.44.24.55.16.1.42.15.77.15h3.76c.73,0,1.35.07,1.86.22.51.15.91.42,1.18.81.27.39.41.97.41,1.73v.61c0,.86-.22,1.54-.66,2.07-.44.52-1.2.79-2.28.79h-6.34Z"/>
              <path fill="#231f20" d="M132.87,24.26v-10.05h10.97v2.32h-7.64v1.42h5.66v2.37h-5.66v1.59h7.37l1.03,2.15s-.15.09-.46.13c-.31.04-.84.06-1.59.06h-9.67Z"/>
              <path fill="#231f20" d="M145.94,24.26l.17-1.37v-8.68h3.28v7.71h6.05l1.03,2.15s-.15.09-.46.13c-.31.04-.84.06-1.59.06h-8.48Z"/>
              <path fill="#231f20" d="M157.48,24.26v-10.05h10.97v2.32h-7.64v1.42h5.66v2.37h-5.66v1.59h7.37l1.03,2.15s-.15.09-.46.13c-.31.04-.84.06-1.59.06h-9.67Z"/>
              <path fill="#231f20" d="M173.85,24.26c-1.22,0-2.1-.27-2.65-.8-.55-.54-.82-1.4-.82-2.6v-3.13c0-1.23.3-2.13.91-2.69.6-.56,1.46-.85,2.56-.85h4.99c.79,0,1.39.04,1.8.13.42.08.62.17.62.26l-.53,2.14c-.28-.03-.84-.07-1.67-.11-.83-.04-1.87-.06-3.12-.06h-.87c-.54,0-.9.1-1.09.3-.19.2-.28.5-.28.91v2.92c0,.39.08.69.25.9.16.21.54.32,1.12.32h.7c1.63,0,2.87-.02,3.73-.06.86-.04,1.37-.08,1.54-.13l1.04,1.85c0,.06-.12.14-.35.26-.23.11-.63.22-1.18.31-.55.09-1.32.14-2.3.14h-4.41Z"/>
              <polygon fill="#231f20" points="186.48 24.26 186.48 16.52 182.41 16.52 182.41 14.19 193.91 14.19 193.91 16.52 189.79 16.52 189.79 24.26 186.48 24.26"/>
              <path fill="#231f20" d="M197.43,24.26l5.01-10.05h4.44l4.99,10.05h-3.67l-.84-1.83h-5.4l-.94,1.83h-3.59ZM202.9,20.07h3.5l-1.66-3.64h-.17l-1.67,3.64Z"/>
              <path fill="#231f20" d="M216.23,24.43c-1.14,0-2-.27-2.59-.8-.59-.54-.88-1.4-.88-2.6v-6.82h3.33v6.51c0,.54.13.89.39,1.08.26.18.59.27.98.27h2.2c.36,0,.68-.09.96-.28.27-.19.41-.54.41-1.07v-6.51h3.28v6.82c0,1.2-.29,2.06-.86,2.6-.58.54-1.44.8-2.59.8h-4.63Z"/>
              <polygon fill="#231f20" points="229.48 24.26 229.48 16.52 225.41 16.52 225.41 14.19 236.91 14.19 236.91 16.52 232.79 16.52 232.79 24.26 229.48 24.26"/>
              <path fill="#231f20" d="M241.56,24.26c-1.21,0-2.09-.27-2.64-.81-.55-.54-.83-1.4-.83-2.59v-3.26c0-1.16.27-2.02.82-2.56.55-.55,1.43-.82,2.65-.82h4.99c1.2,0,2.07.27,2.62.82.55.55.83,1.4.83,2.56v3.26c0,1.19-.28,2.05-.84,2.59-.56.54-1.43.81-2.61.81h-4.99ZM242.74,21.94h2.65c.89,0,1.33-.4,1.33-1.21v-2.99c0-.8-.45-1.2-1.33-1.2h-2.65c-.46,0-.8.09-1.03.27-.23.18-.34.49-.34.92v2.99c0,.42.11.73.34.92.23.19.57.29,1.03.29"/>
              <polygon fill="#231f20" points="13.3 0 4.5 15.11 12.06 28.14 14.31 24.27 8.99 15.11 15.74 3.5 25.41 20.17 27.66 16.31 18.21 0 13.3 0"/>
              <polygon fill="#10cfc9" points="14.36 39.15 23.16 24.04 15.6 11.01 13.35 14.87 18.67 24.04 11.92 35.64 2.25 18.97 0 22.84 9.45 39.15 14.36 39.15"/>
              <polygon fill="#10cfc9" points="30.55 19 20.9 35.64 19.61 33.41 17.36 37.28 18.44 39.15 23.36 39.15 32.8 22.87 30.55 19"/>
              <path fill="#10cfc9" d="M81.91,39.15v-3.96l-.08-.62h3.62c.42,0,.75.05.97.16.23.1.38.26.47.46.09.21.13.46.13.77v1.8c0,.31-.04.57-.13.78-.09.21-.24.36-.47.46-.23.1-.55.16-.98.16h-3.54ZM82.94,38.4h2.45c.4,0,.6-.18.61-.55v-1.99c0-.15-.04-.28-.13-.39-.09-.11-.25-.16-.48-.16h-2.45v3.09Z"/>
              <path fill="#10cfc9" d="M96.93,39.22c-.21,0-.41-.03-.61-.1-.2-.07-.43-.23-.68-.48l-.56-.56c-.23-.23-.48-.41-.75-.51-.27-.11-.62-.16-1.03-.16h-.24v1.74h-1.03v-3.96l-.08-.63h3.46c.33,0,.59.04.78.13.19.09.33.2.42.35.09.14.15.3.18.46.03.16.04.32.04.46v.15c0,.11-.02.24-.05.38-.03.14-.09.28-.18.41-.09.14-.21.25-.38.34-.16.09-.38.15-.64.16.07.04.15.09.26.17.1.07.21.16.32.25.11.09.22.17.31.24.09.07.17.13.22.16.19.11.35.19.5.23.15.04.27.06.36.07.09,0,.15,0,.16,0l-.16.63s-.13.03-.23.05c-.11.02-.24.03-.38.03M94.22,36.7c.2,0,.37,0,.53-.01.16,0,.3-.02.42-.03.23-.03.39-.09.48-.19.09-.1.14-.23.14-.4v-.18c0-.17-.04-.31-.13-.42-.09-.11-.25-.17-.48-.17h-2.13v1.36c.23.02.44.03.63.03.19,0,.37,0,.54,0"/>
              <rect fill="#10cfc9" x="102.23" y="34.56" width="1.03" height="4.59"/>
              <polygon fill="#10cfc9" points="109.96 39.15 107.78 34.56 108.88 34.56 110.34 37.73 110.55 38.29 110.62 38.29 110.83 37.73 112.31 34.56 113.37 34.56 113.25 35.03 111.21 39.15 109.96 39.15"/>
              <path fill="#10cfc9" d="M117.9,39.15v-4.59h4.85v.75h-3.82v1.08h2.92v.77h-2.92v1.24h3.85l.31.66s-.07.04-.21.06c-.14.02-.38.03-.73.03h-4.26Z"/>
              <polygon fill="#10cfc9" points="127.78 39.15 127.78 35.18 127.7 34.56 128.82 34.56 131.47 37.33 131.78 37.76 131.86 37.76 131.86 34.56 132.89 34.56 132.89 39.15 131.9 39.15 129.19 36.32 128.88 35.95 128.81 35.95 128.81 39.15 127.78 39.15"/>
              <path fill="#10cfc9" d="M143.51,39.15v-4.6h3.39c.49,0,.85.1,1.07.29.22.2.34.43.34.71v.23c0,.21-.05.39-.14.53-.09.14-.19.24-.29.29.23.07.41.2.55.38.13.18.2.41.2.71v.14c0,.16-.02.31-.05.47-.04.16-.11.3-.21.43-.1.13-.24.23-.43.31-.18.08-.43.12-.72.12h-3.71ZM144.54,36.39h2.2c.18,0,.32-.04.41-.14.09-.1.13-.22.13-.36v-.08c0-.12-.04-.24-.12-.35-.08-.11-.24-.17-.47-.17h-2.15v1.09ZM144.54,38.4h2.46c.2,0,.35-.05.45-.15.1-.1.15-.23.15-.41v-.14c0-.16-.06-.29-.18-.39-.12-.1-.32-.15-.59-.15h-2.29v1.24Z"/>
              <polygon fill="#10cfc9" points="155.27 39.15 155.27 37.24 153 34.56 154.24 34.56 155.4 36.02 155.76 36.5 155.84 36.5 156.19 36.02 157.35 34.56 158.6 34.56 158.29 35.03 156.3 37.27 156.3 39.15 155.27 39.15"/>
              <polygon fill="#10cfc9" points="170.23 39.15 170.23 35.3 168.2 35.3 168.2 34.55 173.3 34.55 173.3 35.3 171.26 35.3 171.26 39.15 170.23 39.15"/>
              <path fill="#10cfc9" d="M182.89,39.22c-.21,0-.41-.03-.61-.1-.2-.07-.43-.23-.68-.48l-.56-.56c-.23-.23-.48-.41-.75-.51-.27-.11-.62-.16-1.03-.16h-.24v1.74h-1.03v-3.96l-.08-.63h3.46c.33,0,.59.04.78.13.19.09.33.2.42.35.09.14.15.3.18.46.03.16.04.32.04.46v.15c0,.11-.02.24-.05.38-.03.14-.09.28-.18.41-.09.14-.21.25-.38.34-.16.09-.38.15-.64.16.07.04.15.09.26.17.1.07.21.16.32.25.11.09.22.17.31.24.09.07.17.13.22.16.19.11.35.19.5.23.14.04.27.06.36.07.09,0,.15,0,.16,0l-.16.63s-.13.03-.24.05c-.11.02-.24.03-.38.03M180.18,36.7c.2,0,.37,0,.53-.01.16,0,.3-.02.42-.03.23-.03.39-.09.48-.19.09-.1.14-.23.14-.4v-.18c0-.17-.04-.31-.13-.42-.09-.11-.25-.17-.48-.17h-2.13v1.36c.23.02.44.03.63.03.19,0,.37,0,.54,0"/>
              <path fill="#10cfc9" d="M189.34,39.22c-.47,0-.8-.13-.99-.38-.19-.26-.28-.59-.28-1.01v-3.27h1.03v3.3c0,.24.06.41.18.49.12.08.27.13.45.13h1.65c.17,0,.31-.04.44-.13.13-.09.19-.25.19-.49v-3.3h1.03v3.27c0,.28-.04.52-.12.73-.08.21-.21.37-.39.49-.18.12-.44.18-.76.18h-2.43Z"/>
              <path fill="#10cfc9" d="M198.86,39.15c-.35,0-.61-.02-.78-.05-.17-.03-.25-.07-.25-.11l.31-.68c.12.02.42.04.89.06.48.02,1.13.03,1.96.03h.15c.22,0,.38-.04.48-.12.09-.08.14-.22.14-.41v-.16c0-.18-.04-.31-.11-.39-.07-.08-.24-.12-.5-.12h-1.81c-.53,0-.91-.1-1.15-.29-.24-.2-.36-.51-.36-.96v-.13c0-.23.04-.44.13-.63.09-.19.23-.35.44-.46.21-.12.49-.18.86-.18h2.12c.35,0,.64.02.86.06.22.04.33.07.33.12l-.16.66c-.14-.02-.44-.03-.92-.05-.48-.02-1.12-.03-1.93-.03h-.09c-.24,0-.4.04-.48.14-.08.1-.13.22-.13.36v.13c0,.17.05.3.14.39.1.09.26.13.48.13h1.73c.33,0,.62.03.85.1.23.07.41.19.54.37.13.18.19.44.19.79v.13c0,.39-.1.71-.3.94s-.55.36-1.04.36h-2.59Z"/>
              <polygon fill="#10cfc9" points="209.28 39.15 209.27 35.3 207.24 35.3 207.24 34.55 212.35 34.55 212.35 35.3 210.31 35.3 210.31 39.15 209.28 39.15"/>
            </g>
          </g>
        </svg>
        <div className="flex flex-col text-sm text-slate-500 mt-2 space-y-1">
          <div className="flex items-center gap-1"><MapPin size={14} /> 2110 7th Avenue, Regina, SK S4R 1C4</div>
          <div className="flex items-center gap-1"><Phone size={14} /> (306) 533-4188</div>
          <div className="flex items-center gap-1"><Mail size={14} /> info@wolduselect.ca</div>
        </div>
      </div>
      <div className="mt-4 md:mt-0 text-right">
        <div 
          className="inline-block px-4 py-1 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-2"
          style={{ backgroundColor: brandColor }}
        >
          {view}
        </div>
        <div className="text-2xl font-bold text-slate-800 tracking-tight">#WO-4012053</div>
        <div className="text-sm text-slate-400">Date: Nov 28, 2019</div>
      </div>
    </div>
  );

  const SectionTitle = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 mb-4">
      <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${brandColor}15`, color: brandColor }}>
        <Icon size={18} />
      </div>
      <h2 className="font-bold text-slate-700 uppercase tracking-wider text-sm">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      {/* 5-Stage Navigation Bar */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-wrap gap-2 justify-center bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
        {views.map((type, index) => (
          <button
            key={type}
            onClick={() => setView(type)}
            className={`px-4 py-2 text-sm rounded-xl font-medium transition-all flex items-center gap-2 ${
              view === type 
              ? 'text-white shadow-md' 
              : 'bg-transparent text-slate-500 hover:bg-slate-100'
            }`}
            style={view === type ? { backgroundColor: brandColor } : {}}
          >
            <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] ${view === type ? 'bg-white/20' : 'bg-slate-200 text-slate-600'}`}>
              {index + 1}
            </span>
            {type}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200">
        <div className="p-8">
          <Header />

          {/* Customer & Timeline Info (Simplified) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <SectionTitle icon={User} title="Customer Information" />
              <div className="space-y-1">
                <p className="font-bold text-lg text-slate-900">{data.customer.name}</p>
                <p className="text-slate-600">{data.customer.address}</p>
                <p className="text-slate-600">{data.customer.city}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <SectionTitle icon={Clock} title="Service Timeline" />
              <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                <div>
                  <label className="text-slate-400 block uppercase text-[10px] font-bold">Opened</label>
                  <p className="text-slate-700 font-medium">{data.service.opened}</p>
                </div>
                <div>
                  <label className="text-slate-400 block uppercase text-[10px] font-bold">Ready</label>
                  <p className="text-slate-700 font-medium">{data.service.ready}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Highlights (Simplified) */}
          <div className="mb-8 overflow-hidden rounded-2xl border border-slate-100 flex flex-col md:flex-row">
            <div className="bg-slate-800 text-white p-6 flex flex-col justify-center items-center md:w-1/4">
               <Car size={32} className="mb-2 opacity-50" />
               <p className="text-xs uppercase font-bold tracking-widest opacity-60">Vehicle</p>
               <p className="text-xl font-bold">{data.vehicle.year} {data.vehicle.make}</p>
            </div>
            <div className="bg-white p-6 md:w-3/4 grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <label className="text-slate-400 block uppercase text-[10px] font-bold">Model</label>
                <p className="font-bold text-slate-800">{data.vehicle.model}</p>
              </div>
              <div>
                <label className="text-slate-400 block uppercase text-[10px] font-bold">VIN</label>
                <p className="font-bold text-slate-800 truncate" title={data.vehicle.vin}>{data.vehicle.vin}</p>
              </div>
              <div>
                <label className="text-slate-400 block uppercase text-[10px] font-bold">Odometer</label>
                <p className="font-bold text-slate-800">{data.vehicle.odometer}</p>
              </div>
              <div>
                <label className="text-slate-400 block uppercase text-[10px] font-bold">Tag</label>
                <p className="font-bold text-slate-800">{data.vehicle.tag}</p>
              </div>
            </div>
          </div>

          {/* Dynamic Line Items based on View */}
          <div className="mb-8">
            <SectionTitle icon={Wrench} title="Line Items" />
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-y-2 text-sm">
                <thead>
                  <tr className="text-left text-slate-400 uppercase text-[10px] font-bold">
                    <th className="px-4 py-2 w-24">Code</th>
                    <th className="px-4 py-2">Description</th>
                    
                    {/* View-specific headers */}
                    {view === 'Technician Copy' && <th className="px-4 py-2">Tech Findings / Notes</th>}
                    
                    {view === 'Customer Estimate' && (
                      <>
                        <th className="px-4 py-2 text-right">Parts Est.</th>
                        <th className="px-4 py-2 text-right">Labor Est.</th>
                        <th className="px-4 py-2 text-right">Total Est.</th>
                        <th className="px-4 py-2 text-center">Status</th>
                      </>
                    )}
                    
                    {view === 'Final Invoice' && <th className="px-4 py-2 text-right">Amount</th>}
                    
                    {view === 'Internal Copy' && (
                      <>
                        <th className="px-4 py-2">Tech ID</th>
                        <th className="px-4 py-2 text-right">Lab. Hrs</th>
                        <th className="px-4 py-2 text-right bg-red-50 text-red-600 rounded-t-lg">Part Cost</th>
                        <th className="px-4 py-2 text-right bg-green-50 text-green-600 rounded-t-lg">Part Sell</th>
                        <th className="px-4 py-2 text-right">Total</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {displayItems.map((item) => {
                    const itemLabor = item.laborHours * data.shop.laborRate;
                    const itemTotal = itemLabor + item.partSell;

                    return (
                      <tr key={item.id} className={`group transition-colors ${item.type === 'upsell' && view !== 'Final Invoice' ? 'bg-blue-50/50' : 'bg-slate-50'} hover:bg-slate-100`}>
                        <td className="px-4 py-4 rounded-l-xl font-mono text-xs text-slate-500">
                          {item.code}
                          {item.type === 'upsell' && view !== 'Final Invoice' && <span className="block text-[9px] text-blue-500 font-bold uppercase mt-1">Upsell</span>}
                        </td>
                        <td className="px-4 py-4 font-bold text-slate-800">{item.description}</td>

                        {/* Repair Order has no extra columns */}

                        {view === 'Technician Copy' && (
                          <td className="px-4 py-4 text-slate-600 italic rounded-r-xl border-l border-slate-200">
                            {item.techNotes || <span className="text-slate-300">Awaiting inspection...</span>}
                          </td>
                        )}

                        {view === 'Customer Estimate' && (
                          <>
                            <td className="px-4 py-4 text-right text-slate-600">${item.partSell.toFixed(2)}</td>
                            <td className="px-4 py-4 text-right text-slate-600">${itemLabor.toFixed(2)}</td>
                            <td className="px-4 py-4 text-right font-bold text-slate-900">${itemTotal.toFixed(2)}</td>
                            <td className="px-4 py-4 rounded-r-xl text-center">
                              {item.status === 'approved' ? (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full"><CheckCircle2 size={12}/> Approved</span>
                              ) : item.status === 'declined' ? (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full"><XCircle size={12}/> Declined</span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full"><AlertCircle size={12}/> Pending</span>
                              )}
                            </td>
                          </>
                        )}

                        {view === 'Final Invoice' && (
                          <td className="px-4 py-4 rounded-r-xl text-right font-bold text-slate-900">${itemTotal.toFixed(2)}</td>
                        )}

                        {view === 'Internal Copy' && (
                          <>
                            <td className="px-4 py-4 text-slate-600 text-xs font-mono">{item.technician}</td>
                            <td className="px-4 py-4 text-right text-slate-600">{item.laborHours.toFixed(1)}</td>
                            <td className="px-4 py-4 text-right text-red-700 bg-red-50">${item.partCost.toFixed(2)}</td>
                            <td className="px-4 py-4 text-right text-green-700 bg-green-50">${item.partSell.toFixed(2)}</td>
                            <td className="px-4 py-4 rounded-r-xl text-right font-bold text-slate-900">${itemTotal.toFixed(2)}</td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer & Totals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end pt-8 border-t">
            <div className="text-xs text-slate-400 space-y-4">
              <div className="p-4 rounded-xl border border-dashed border-slate-200">
                <p className="font-bold uppercase mb-1 text-slate-500">Service Terms</p>
                <p>All repairs performed using genuine parts are warranted against defects for 12 months. Vehicles are operated for testing purposes at owner's risk. Woldu Select Auto is not responsible for items left in vehicles.</p>
              </div>
              {(view === 'Customer Estimate' || view === 'Final Invoice') && (
                <div className="flex items-center justify-between pt-4">
                  <div className="w-48 border-b-2 border-slate-200 pb-1 italic text-slate-300">Customer Signature</div>
                  <div className="w-48 border-b-2 border-slate-200 pb-1 text-right italic text-slate-300">Date</div>
                </div>
              )}
            </div>

            {/* Dynamic Totals Box */}
            {(view === 'Repair Order' || view === 'Technician Copy') ? (
              <div className="bg-slate-100 rounded-2xl p-6 text-center border border-slate-200 h-full flex flex-col justify-center">
                <p className="text-slate-400 font-bold uppercase tracking-wider text-sm">Totals Pending</p>
                <p className="text-slate-500 text-xs mt-2">Financials are hidden during initial intake and inspection phases.</p>
              </div>
            ) : (
              <div className={`bg-slate-900 text-white rounded-2xl p-6 relative overflow-hidden ${view === 'Customer Estimate' ? 'pt-10' : ''}`}>
                {view === 'Customer Estimate' && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest py-1 px-6 rounded-b-lg shadow-md">
                    Estimate
                  </div>
                )}
                
                <div className="space-y-2 mb-4">
                  {/* Internal copy shows full breakdown including costs */}
                  {view === 'Internal Copy' ? (
                    <>
                      <div className="flex justify-between text-sm opacity-60"><span>Total Labor ({data.shop.laborRate}/hr)</span><span>${totals.labor.toFixed(2)}</span></div>
                      <div className="flex justify-between text-sm opacity-60 text-red-300"><span>Parts Cost (Buy)</span><span>${totals.partsCost.toFixed(2)}</span></div>
                      <div className="flex justify-between text-sm opacity-60 text-green-300"><span>Parts Revenue (Sell)</span><span>${totals.partsSell.toFixed(2)}</span></div>
                      <div className="flex justify-between text-sm opacity-60"><span>Misc / Shop Supplies</span><span>${totals.misc.toFixed(2)}</span></div>
                      <div className="flex justify-between text-sm opacity-60 pt-2 border-t border-white/10"><span>Subtotal</span><span>${totals.subtotal.toFixed(2)}</span></div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between text-sm opacity-60"><span>Labor Amount</span><span>${totals.labor.toFixed(2)}</span></div>
                      <div className="flex justify-between text-sm opacity-60"><span>Parts Amount</span><span>${totals.partsSell.toFixed(2)}</span></div>
                      <div className="flex justify-between text-sm opacity-60"><span>Misc / Shop Supplies</span><span>${totals.misc.toFixed(2)}</span></div>
                      <div className="flex justify-between text-sm opacity-60 pt-2 border-t border-white/10"><span>Subtotal</span><span>${totals.subtotal.toFixed(2)}</span></div>
                    </>
                  )}
                  
                  <div className="flex justify-between text-sm opacity-60">
                    <span>Tax (GST/PST)</span>
                    <span>${totals.tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="font-bold uppercase tracking-widest text-xs">
                    {view === 'Customer Estimate' ? 'Estimated Total' : 'Total Due'}
                  </span>
                  <span className="text-3xl font-black" style={{ color: brandColor }}>
                    ${totals.total.toFixed(2)}
                  </span>
                </div>
                
                {/* Internal Profit Margin Display */}
                {view === 'Internal Copy' && (
                  <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-xs text-green-400 font-bold">
                    <span>EST. SHOP GROSS PROFIT</span>
                    <span>${totals.profit.toFixed(2)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Brand Bar Bottom */}
        <div className="h-2 w-full" style={{ backgroundColor: brandColor }}></div>
      </div>
    </div>
  );
};

export default App;