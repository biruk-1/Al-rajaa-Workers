// src/LanguageContext.js
import React, { createContext, useState, useContext } from 'react';

// Create LanguageContext
const LanguageContext = createContext();

// Define your translations
const translations = {
  en: {
    header: {
      title: "Al-Rajaa Dashboard",
      language: "English / العربية",
    },
    dashboard: {
      title: "Dashboard Overview",
      totalSponsors: "Total Sponsors",
      totalWorkers: "Total Workers",
      pendingVisas: "Pending Visas",
      paymentsDue: "Payments Due",
      chartTitle: "Sponsors and Workers Over Time",
    },
    
    sponsorManagement: {
      title: "Sponsor Management",
      addSponsor: "Add Sponsor",
      sponsorName: "Sponsor Name",
      contractNumber: "Contract Number",
      visaArrivalDate: "Visa Arrival Date",
      country: "Country",
      financialDetails: "Financial Details",
      additionalInfo: "Additional Info",
      edit: "Edit",
      editSponsor: "Edit Sponsor",
      update: "Update",
      cancel: "Cancel",
      allCountries: "All Countries",
      tableHeaders: {
        name: "Name",
        contractNumber: "Contract Number",
        visaArrivalDate: "Visa Arrival Date",
        country: "Country",
        financialDetails: "Financial Details",
        additionalInfo: "Additional Info",
        actions: "Actions",
      },
    },
    workerManagement: {
      title: "Worker Management",
      addWorker: "Add Worker",
      workerName: "Worker Name",
      nationality: "Nationality",
      arrivalDate: "Arrival Date",
      financialDetails: "Financial Details",
      additionalInfo: "Additional Info",
      actions: "Actions",
      editWorker: "Edit Worker",
      cancel: "Cancel",
      submitChanges: "Submit Changes",
      allNationalities: "All Nationalities",
    },
  },
  ar: {
    header: {
      title: "لوحة التحكم الرجا",
      language: "الإنجليزية / العربية",
    },
    dashboard: {
      title: "نظرة عامة على لوحة المعلومات",
      totalSponsors: "إجمالي الرعاة",
      totalWorkers: "إجمالي العمال",
      pendingVisas: "التأشيرات المعلقة",
      paymentsDue: "المدفوعات المستحقة",
      chartTitle: "الرعاة والعمال على مر الزمن",
    },
    sponsorManagement: {
      title: "إدارة الرعاة",
      addSponsor: "إضافة راع",
      sponsorName: "اسم الراعي",
      contractNumber: "رقم العقد",
      visaArrivalDate: "تاريخ وصول الفيزا",
      country: "البلد",
      financialDetails: "التفاصيل المالية",
      additionalInfo: "معلومات إضافية",
      edit: "تعديل",
      editSponsor: "تعديل الراعي",
      update: "تحديث",
      cancel: "إلغاء",
      allCountries: "جميع البلدان",
      tableHeaders: {
        name: "الاسم",
        contractNumber: "رقم العقد",
        visaArrivalDate: "تاريخ وصول الفيزا",
        country: "البلد",
        financialDetails: "التفاصيل المالية",
        additionalInfo: "معلومات إضافية",
        actions: "الإجراءات",
      },
    },
    workerManagement: {
      title: "إدارة العمال",
      addWorker: "إضافة عامل",
      workerName: "اسم العامل",
      nationality: "الجنسية",
      arrivalDate: "تاريخ الوصول",
      financialDetails: "تفاصيل مالية",
      additionalInfo: "معلومات إضافية",
      actions: "إجراءات",
      editWorker: "تعديل العامل",
      cancel: "إلغاء",
      submitChanges: "تقديم التغييرات",
      allNationalities: "جميع الجنسيات",
    },
  },
};

// LanguageProvider Component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom Hook to use Language Context
export const useLanguage = () => {
  return useContext(LanguageContext);
};

// Worker Management Component
export const WorkerManagement = () => {
  const { language, translations } = useLanguage();
  const currentTranslations = translations[language]?.workerManagement; // Safely accessing translations

  return (
    <div>
      <h1>{currentTranslations?.title || "Default Title"}</h1>
      <button>{currentTranslations?.addWorker}</button>
      {/* Display worker data in a table or form */}
    </div>
  );
};

// Sponsor Management Component
export const SponsorManagement = () => {
  const { language, translations } = useLanguage();
  const currentTranslations = translations[language]?.sponsorManagement; // Safely accessing translations

  return (
    <div>
      <h1>{currentTranslations?.title || "Default Title"}</h1>
      <button>{currentTranslations?.addSponsor}</button>
      {/* Display sponsor data in a table or form */}
      <table>
        <thead>
          <tr>
            <th>{currentTranslations?.tableHeaders.name}</th>
            <th>{currentTranslations?.tableHeaders.contractNumber}</th>
            <th>{currentTranslations?.tableHeaders.visaArrivalDate}</th>
            <th>{currentTranslations?.tableHeaders.country}</th>
            <th>{currentTranslations?.tableHeaders.financialDetails}</th>
            <th>{currentTranslations?.tableHeaders.additionalInfo}</th>
            <th>{currentTranslations?.tableHeaders.actions}</th>
          </tr>
        </thead>
        <tbody>
          {/* Add rows for each sponsor */}
        </tbody>
      </table>
    </div>
  );
};
