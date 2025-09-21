'use client';
// Canva 연동을 위한 유틸리티 함수들

export interface CanvaExportData {
  title: string;
  description: string;
  template: string;
  destinations: Array<{
    name: string;
    arrivalDate: string;
    departureDate: string;
    activities: string[];
  }>;
  budget: number;
  targetCustomer: string;
  contactInfo: {
    phone: string;
    email: string;
    website: string;
  };
  colors: string;
}

export interface CanvaTemplate {
  id: string;
  name: string;
  canvaUrl: string;
  description: string;
  category: 'travel' | 'business' | 'education';
}

// Canva 템플릿 목록 (실제 Canva 템플릿 ID로 교체 필요)
export const canvaTemplates: CanvaTemplate[] = [
  {
    id: 'travel-brochure-1',
    name: '여행 브로슈어 - 클래식',
    canvaUrl: 'https://www.canva.com/design/DAFxxx/edit',
    description: '전통적이고 우아한 여행 브로슈어 템플릿',
    category: 'travel'
  },
  {
    id: 'travel-brochure-2',
    name: '여행 브로슈어 - 모던',
    canvaUrl: 'https://www.canva.com/design/DAFyyy/edit',
    description: '현대적이고 세련된 여행 브로슈어 템플릿',
    category: 'travel'
  },
  {
    id: 'travel-brochure-3',
    name: '여행 브로슈어 - 어드벤처',
    canvaUrl: 'https://www.canva.com/design/DAFzzz/edit',
    description: '모험적이고 역동적인 여행 브로슈어 템플릿',
    category: 'travel'
  }
];

/**
 * Canva 연동을 위한 데이터 내보내기
 */
export const exportToCanva = (data: CanvaExportData): void => {
  // JSON 파일로 다운로드
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.title}_canva_data.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Canva API 연동을 위한 데이터 변환
 */
export const convertToCanvaFormat = (data: CanvaExportData) => {
  return {
    elements: [
      {
        type: 'text',
        content: data.title,
        style: {
          fontSize: 32,
          fontWeight: 'bold',
          color: '#333333'
        },
        position: { x: 50, y: 50 }
      },
      {
        type: 'text',
        content: data.description,
        style: {
          fontSize: 16,
          color: '#666666'
        },
        position: { x: 50, y: 100 }
      },
      {
        type: 'text',
        content: `예산: ₩${data.budget.toLocaleString()}`,
        style: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#2563eb'
        },
        position: { x: 50, y: 150 }
      },
      {
        type: 'text',
        content: `연락처: ${data.contactInfo.phone}`,
        style: {
          fontSize: 14,
          color: '#374151'
        },
        position: { x: 50, y: 200 }
      }
    ],
    background: {
      color: data.colors || '#ffffff'
    },
    metadata: {
      title: data.title,
      category: 'travel-brochure',
      createdAt: new Date().toISOString()
    }
  };
};

/**
 * Canva 템플릿 URL 생성
 */
export const generateCanvaTemplateUrl = (templateId: string, data: CanvaExportData): string => {
  const template = canvaTemplates.find(t => t.id === templateId);
  if (!template) {
    return 'https://www.canva.com/create/brochures/';
  }

  // URL 파라미터로 데이터 전달 (실제 Canva API 스펙에 맞게 조정 필요)
  const params = new URLSearchParams({
    title: data.title,
    description: data.description,
    budget: data.budget.toString(),
    phone: data.contactInfo.phone,
    email: data.contactInfo.email,
    website: data.contactInfo.website
  });

  return `${template.canvaUrl}?${params.toString()}`;
};

/**
 * 브로슈어 데이터를 CSV 형식으로 내보내기 (스프레드시트 연동용)
 */
export const exportToCSV = (data: CanvaExportData): void => {
  const csvData = [
    ['항목', '내용'],
    ['제목', data.title],
    ['설명', data.description],
    ['예산', `₩${data.budget.toLocaleString()}`],
    ['타겟 고객', data.targetCustomer],
    ['전화번호', data.contactInfo.phone],
    ['이메일', data.contactInfo.email],
    ['웹사이트', data.contactInfo.website],
    ['방문 도시', data.destinations.map(d => d.name).join(', ')],
    ['주요 활동', data.destinations.flatMap(d => d.activities).join(', ')]
  ];

  const csvContent = csvData.map(row => 
    row.map(cell => `"${cell}"`).join(',')
  ).join('\n');

  const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.title}_data.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Adobe InDesign 연동을 위한 XML 내보내기
 */
export const exportToInDesignXML = (data: CanvaExportData): void => {
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<brochure>
  <title>${data.title}</title>
  <description>${data.description}</description>
  <budget>${data.budget}</budget>
  <targetCustomer>${data.targetCustomer}</targetCustomer>
  <contact>
    <phone>${data.contactInfo.phone}</phone>
    <email>${data.contactInfo.email}</email>
    <website>${data.contactInfo.website}</website>
  </contact>
  <destinations>
    ${data.destinations.map(dest => `
    <destination>
      <name>${dest.name}</name>
      <arrivalDate>${dest.arrivalDate}</arrivalDate>
      <departureDate>${dest.departureDate}</departureDate>
      <activities>
        ${dest.activities.map(activity => `<activity>${activity}</activity>`).join('\n        ')}
      </activities>
    </destination>`).join('')}
  </destinations>
</brochure>`;

  const dataBlob = new Blob([xmlContent], { type: 'application/xml' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.title}_indesign.xml`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};