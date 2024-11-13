import React, { createContext, useState, useContext, useEffect } from 'react';

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
      workerSponsorData: "Worker & Sponsor Data",
      sponsorName: "Sponsor Name",
      workerName: "Worker Name",
      country: "Country",
      amountPaid: "Amount Paid",
      admin: "Admin",
      edit: "Edit",
      editWorker: "Edit Worker",
      cancel: "Cancel",
      update: "Update",
      unknown: "Unknown", // For unknown sponsors
    },
    sidebar: {
      dashboard: 'Dashboard',
      sponsorManagement: 'Sponsor Management',
      workerManagement: 'Worker Management',
      payments: 'Payments',
      reports: 'Reports',
      settings: 'Settings',
      helpSupport: 'Help/Support',
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
      title: "نظرة عامة على لوحة التحكم",
      totalSponsors: "إجمالي الرعاة",
      totalWorkers: "إجمالي العمال",
      pendingVisas: "التأشيرات المعلقة",
      paymentsDue: "المدفوعات المستحقة",
      chartTitle: "الرعاة والعمال على مر الزمن",
      workerSponsorData: "بيانات العمال والرعاة",
      sponsorName: "اسم الراعي",
      workerName: "اسم العامل",
      country: "البلد",
      amountPaid: "المبلغ المدفوع",
      admin: "المدير",
      edit: "تعديل",
      editWorker: "تعديل العامل",
      cancel: "إلغاء",
      update: "تحديث",
      unknown: "غير معروف", // For unknown sponsors
    },
    sidebar: {
      dashboard: 'لوحة القيادة',
      sponsorManagement: 'إدارة الرعاة',
      workerManagement: 'إدارة العمال',
      payments: 'المدفوعات',
      reports: 'التقارير',
      settings: 'الإعدادات',
      helpSupport: 'المساعدة / الدعم',
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
      financialDetails: "التفاصيل المالية",
      additionalInfo: "معلومات إضافية",
      actions: "الإجراءات",
      editWorker: "تعديل العامل",
      cancel: "إلغاء",
      submitChanges: "إرسال التغييرات",
      allNationalities: "جميع الجنسيات",
    },
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'ar' : 'en'));
  };

  // Ensuring translations are available
  const getTranslations = (language) => {
    return translations[language] || translations.en; // fallback to 'en' if undefined
  };

  const value = { language, toggleLanguage, translations: getTranslations(language) };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
