import React, { useState } from 'react';
import { 
  Search, 
  MoreHorizontal, 
  SlidersHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const invoices = [
  { id: '#INV-3051', amount: '$1,280', date: 'Mar 14, 2035', status: 'Paid' },
  { id: '#INV-3052', amount: '$720', date: 'Mar 13, 2035', status: 'Paid' },
  { id: '#INV-3053', amount: '$2,540', date: 'Mar 13, 2035', status: 'Paid' },
  { id: '#INV-3054', amount: '$1,050', date: 'Mar 12, 2035', status: 'Unpaid' },
  { id: '#INV-3055', amount: '$980', date: 'Mar 12, 2035', status: 'Paid' },
  { id: '#INV-3056', amount: '$1,150', date: 'Mar 11, 2035', status: 'Unpaid', selected: true },
  { id: '#INV-3057', amount: '$640', date: 'Mar 11, 2035', status: 'Paid' },
  { id: '#INV-3060', amount: '$640', date: 'Mar 11, 2035', status: 'Paid' },
  { id: '#INV-3061', amount: '$1,050', date: 'Mar 10, 2035', status: 'Unpaid' },
  { id: '#INV-3062', amount: '$1,050', date: 'Mar 10, 2035', status: 'Unpaid' },
];

export function Invoice() {
  return (
    <div className="flex flex-col xl:flex-row gap-6 w-full min-h-[700px]">
      
      {/* Left Column */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* KPI Cards */}
        <div className="bg-[#1c64f2] dark:bg-gray-900 rounded-[24px] p-6 lg:p-8 flex flex-col md:flex-row gap-6 mb-6 border border-transparent dark:border-gray-800">
          <div className="flex-1 flex flex-col justify-center text-white">
            <h3 className="text-sm font-medium text-blue-100 dark:text-gray-400 mb-4">Total Issued Invoices</h3>
            <div className="flex items-center gap-4">
              <span className="text-5xl font-bold">140</span>
              <div className="flex flex-col gap-1">
                <span className="bg-[#dcf344] text-gray-900 dark:bg-emerald-500/20 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 w-fit">
                  <ArrowUpRight className="h-3 w-3" /> +15.6%
                </span>
                <span className="text-[10px] text-blue-200 dark:text-gray-500 font-medium">from last week</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 flex-[2]">
            {/* Paid Invoices Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 flex-1 flex flex-col justify-center relative border border-transparent dark:border-gray-800">
              <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#edf5ff] dark:bg-gray-800 text-[#1c64f2] dark:text-blue-400 flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Paid Invoices</h3>
              <span className="text-3xl font-bold text-gray-900 dark:text-white mb-3">42</span>
              <div className="flex items-center gap-2">
                <span className="bg-[#ffe5e5] dark:bg-red-500/20 text-[#e02424] dark:text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <ArrowDownRight className="h-3 w-3" /> (-4.1%)
                </span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">compared to last month</span>
              </div>
            </div>

            {/* Unpaid Invoices Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 flex-1 flex flex-col justify-center relative border border-transparent dark:border-gray-800">
               <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#edf5ff] dark:bg-gray-800 text-[#1c64f2] dark:text-blue-400 flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Unpaid Invoices</h3>
              <span className="text-3xl font-bold text-gray-900 dark:text-white mb-3">14</span>
              <div className="flex items-center gap-2">
                <span className="bg-[#dcf344] text-gray-900 dark:bg-blue-500/20 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" /> +9.3%
                </span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">from last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice List */}
        <div className="bg-white dark:bg-gray-900 flex-1 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <input 
                type="text" 
                placeholder="Search placeholder" 
                className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-full text-xs outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-gray-700 text-gray-900 dark:text-white font-medium"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-850 border border-gray-100 dark:border-gray-800">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
              <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-850">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
             <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-800/40 text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800">
                  <th className="px-6 py-4 font-medium uppercase tracking-wider">Invoice ID ↕</th>
                  <th className="px-6 py-4 font-medium uppercase tracking-wider">Total Amount ↕</th>
                  <th className="px-6 py-4 font-medium uppercase tracking-wider">Issued Date ↕</th>
                  <th className="px-6 py-4 font-medium uppercase tracking-wider">Status ↕</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-700 dark:text-gray-300">
                {invoices.map((inv) => (
                  <tr key={inv.id} className={`border-b border-gray-50 dark:border-gray-800/60 transition-colors cursor-pointer ${inv.selected ? 'bg-gray-50 dark:bg-gray-800 shadow-[inset_3px_0_0_#1c64f2] dark:shadow-[inset_3px_0_0_#3b82f6]' : 'hover:bg-gray-50/50 dark:hover:bg-gray-800/40'}`}>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{inv.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">{inv.amount}</td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 font-medium">{inv.date}</td>
                    <td className="px-6 py-4 font-medium flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${inv.status === 'Paid' ? 'bg-[#1c64f2] dark:bg-blue-500' : 'bg-[#e02424] dark:bg-red-500'}`}></div>
                      {inv.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Column: Invoice Details */}
      <div className="w-full xl:w-[480px] bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 flex-shrink-0 flex flex-col flex-1 sm:h-fit">
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Invoice Details</h2>
            <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          <div className="bg-gray-50/80 dark:bg-gray-800/50 rounded-xl p-4 flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Invoice ID:</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">#INV-3056</span>
            </div>
            <div className="bg-[#ffe5e5] dark:bg-red-500/20 text-[#e02424] dark:text-red-400 px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#e02424] dark:bg-red-500"></div>
              Unpaid
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8 text-[13px]">
            <div>
              <h4 className="text-gray-500 dark:text-gray-400 mb-2 font-medium">Bill From</h4>
              <p className="font-semibold text-gray-900 dark:text-white mb-4">Hotelify Management</p>
              
              <div className="space-y-3 text-gray-600 dark:text-gray-300">
                 <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-gray-400 dark:text-gray-500" /> finance@hotelify.com</div>
                 <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-gray-400 dark:text-gray-500" /> +1 (555) 236-7410</div>
                 <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" /> <span className="leading-tight">102 Sunset Avenue, Los Angeles, CA 90021, USA</span></div>
              </div>
            </div>
            
            <div>
              <h4 className="text-gray-500 dark:text-gray-400 mb-2 font-medium">Bill To</h4>
              <p className="font-semibold text-gray-900 dark:text-white mb-4">Benjamin Carter</p>
              
              <div className="space-y-3 text-gray-600 dark:text-gray-300">
                 <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-gray-400 dark:text-gray-500" /> benjamin.carter@giggle.com</div>
                 <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-gray-400 dark:text-gray-500" /> +1 (310) 874-2235</div>
                 <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" /> <span className="leading-tight">94 Maplewood Street, Pasadena, CA 91105, USA</span></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8 text-[13px]">
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1 font-medium text-xs">Issued Date</p>
              <p className="font-semibold text-gray-900 dark:text-white">Mar 11, 2035</p>
            </div>
            <div>
               <p className="text-gray-500 dark:text-gray-400 mb-1 font-medium text-xs">Due Date</p>
              <p className="font-semibold text-gray-900 dark:text-white">Mar 18, 2035</p>
            </div>
          </div>

          <table className="w-full text-left border-collapse mb-8">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-gray-800/50 text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                <th className="py-3 px-4 rounded-l-lg">Room Type</th>
                <th className="py-3 px-2">Price</th>
                <th className="py-3 px-2">Qty</th>
                <th className="py-3 px-4 rounded-r-lg text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              <tr className="border-b border-gray-100 dark:border-gray-850">
                <td className="py-4 px-4 font-medium text-gray-800 dark:text-gray-200">Superior Room</td>
                <td className="py-4 px-2 text-gray-600 dark:text-gray-400">$400</td>
                <td className="py-4 px-2 text-gray-600 dark:text-gray-400">2 Nights</td>
                <td className="py-4 px-4 text-right font-semibold text-gray-900 dark:text-white">$800</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-850">
                <td className="py-4 px-4 font-medium text-gray-800 dark:text-gray-200">
                  Room Service
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 font-normal">(Dinner & Drinks)</div>
                </td>
                <td className="py-4 px-2 text-gray-600 dark:text-gray-400">$65</td>
                <td className="py-4 px-2 text-gray-600 dark:text-gray-400">1 Order</td>
                <td className="py-4 px-4 text-right font-semibold text-gray-900 dark:text-white">$65</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-850">
                <td className="py-4 px-4 font-medium text-gray-800 dark:text-gray-200">Laundry Service</td>
                <td className="py-4 px-2 text-gray-600 dark:text-gray-400">$25</td>
                <td className="py-4 px-2 text-gray-600 dark:text-gray-400">2 Loads</td>
                <td className="py-4 px-4 text-right font-semibold text-gray-900 dark:text-white">$50</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-850">
                <td className="py-4 px-4 font-medium text-gray-800 dark:text-gray-200">
                  Minibar
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 font-normal">Consumption</div>
                </td>
                <td className="py-4 px-2 text-gray-600 dark:text-gray-400">$15</td>
                <td className="py-4 px-2 text-gray-600 dark:text-gray-400">3 Items</td>
                <td className="py-4 px-4 text-right font-semibold text-gray-900 dark:text-white">$45</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-850">
                <td className="py-4 px-4 font-medium text-gray-800 dark:text-gray-200">Late Checkout Fee</td>
                <td className="py-4 px-2 text-gray-600 dark:text-gray-400">$50</td>
                <td className="py-4 px-2 text-gray-600 dark:text-gray-400">1 Time</td>
                <td className="py-4 px-4 text-right font-semibold text-gray-900 dark:text-white">$50</td>
              </tr>
            </tbody>
          </table>

          <div className="flex flex-col items-end gap-3 text-[13px] mb-8 pr-4">
            <div className="flex w-48 justify-between">
              <span className="text-gray-500 dark:text-gray-400 font-medium">Sub Total</span>
              <span className="font-semibold text-gray-900 dark:text-white">$1,010</span>
            </div>
            <div className="flex w-48 justify-between">
              <span className="text-gray-500 dark:text-gray-400 font-medium">Tax (10%)</span>
              <span className="font-semibold text-gray-900 dark:text-white">$101</span>
            </div>
            <div className="flex w-48 justify-between">
              <span className="text-gray-500 dark:text-gray-400 font-medium">Service Fee</span>
              <span className="font-semibold text-gray-900 dark:text-white">$39</span>
            </div>
            <div className="flex w-48 justify-between border-t border-gray-100 dark:border-gray-800 pt-3 mt-1">
              <span className="text-gray-900 dark:text-white font-bold">Total</span>
              <span className="font-bold text-gray-900 dark:text-white">$1,150</span>
            </div>
          </div>

          <div className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed bg-gray-50/50 dark:bg-gray-800/30 p-4 rounded-xl">
            <span className="font-medium">Note:</span><br/>
            Payment is currently unpaid and due within 7 days via Hotelify's online portal, front desk, or bank transfer.<br/>
            A 5% <span className="font-bold text-gray-700 dark:text-gray-300">late fee</span> may apply for payments received after <span className="font-bold text-gray-700 dark:text-gray-300">Mar 18, 2035</span>.
          </div>
        </div>
      </div>

    </div>
  );
}

