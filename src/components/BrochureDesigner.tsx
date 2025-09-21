'use client';

import React, { useState, useRef } from 'react';
import { TravelPlan, PromotionalMaterial } from '../types';
import { 
  exportToCanva, 
  exportToCSV, 
  exportToInDesignXML, 
  generateCanvaTemplateUrl,
  CanvaExportData 
} from '../utils/canvaIntegration';

interface BrochureDesignerProps {
  travelPlan: TravelPlan;
  onSave: (material: PromotionalMaterial) => void;
}

const BrochureDesigner = ({ travelPlan, onSave }: BrochureDesignerProps) => {
  const [title, setTitle] = useState(`${travelPlan.title} 여행 안내`);
  const [description, setDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('fun');
  const [contactInfo, setContactInfo] = useState({ phone: '010-1234-5678', email: 'contact@voyage.com', website: 'https://voyage.com' });
  const [generatedHTML, setGeneratedHTML] = useState<string>('');
  const printRef = useRef<HTMLIFrameElement>(null);

  const templates = [
    { id: 'classic', name: '클래식', icon: '📜', color: 'from-amber-100 to-amber-200', description: '전통적이고 신뢰감 있는 디자인' },
    { id: 'modern', name: '모던', icon: '🎨', color: 'from-blue-100 to-purple-200', description: '깔끔하고 현대적인 디자인' },
    { id: 'fun', name: '재미있는', icon: '🌈', color: 'from-pink-100 to-yellow-200', description: '활기차고 젊은 감각의 디자인' },
    { id: 'professional', name: '비즈니스', icon: '💼', color: 'from-gray-100 to-blue-100', description: '전문적이고 세련된 디자인' },
    { id: 'luxury', name: '럭셔리', icon: '✨', color: 'from-purple-100 to-pink-100', description: '고급스럽고 우아한 디자인' },
    { id: 'adventure', name: '어드벤처', icon: '🏔️', color: 'from-green-100 to-blue-100', description: '역동적이고 모험적인 디자인' },
  ];

  // 전문적인 HTML 브로슈어 생성
  const generateProfessionalBrochure = (): string => {
    const template = templates.find(t => t.id === selectedTemplate);
    const destinations = travelPlan.destinations || [];
    const budget = travelPlan.totalBudget || travelPlan.budget || 0;
    
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Noto Sans KR', sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
        }
        
        .brochure {
            max-width: 210mm;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="white" opacity="0.1"/></svg>') repeat;
            animation: float 20s infinite linear;
        }
        
        @keyframes float {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        .header h1 {
            font-size: 3em;
            font-weight: 700;
            margin-bottom: 10px;
            position: relative;
            z-index: 2;
        }
        
        .header p {
            font-size: 1.2em;
            opacity: 0.9;
            position: relative;
            z-index: 2;
        }
        
        .content {
            padding: 40px;
        }
        
        .section {
            margin-bottom: 40px;
        }
        
        .section h2 {
            font-size: 1.8em;
            color: #667eea;
            margin-bottom: 20px;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
        }
        
        .destinations-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .destination-card {
            background: #f8f9ff;
            border-radius: 15px;
            padding: 20px;
            border-left: 5px solid #667eea;
        }
        
        .destination-card h3 {
            color: #333;
            margin-bottom: 10px;
            font-size: 1.3em;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .info-card {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 10px;
            padding: 20px;
            text-align: center;
        }
        
        .info-card .icon {
            font-size: 2em;
            margin-bottom: 10px;
        }
        
        .info-card h4 {
            color: #333;
            margin-bottom: 5px;
        }
        
        .footer {
            background: #333;
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-top: 20px;
            flex-wrap: wrap;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .qr-code {
            width: 100px;
            height: 100px;
            background: white;
            border-radius: 10px;
            margin: 20px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
            font-weight: bold;
        }
        
        @media print {
            .brochure {
                box-shadow: none;
                max-width: none;
            }
            
            .header::before {
                animation: none;
            }
        }
    </style>
</head>
<body>
    <div class="brochure">
        <div class="header">
            <h1>${title}</h1>
            <p>${description || '특별한 여행의 시작'}</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>🌍 여행 개요</h2>
                <div class="info-grid">
                    <div class="info-card">
                        <div class="icon">📅</div>
                        <h4>여행 기간</h4>
                        <p>${travelPlan.duration || '미정'}</p>
                    </div>
                    <div class="info-card">
                        <div class="icon">💰</div>
                        <h4>예상 비용</h4>
                        <p>₩${budget.toLocaleString()}</p>
                    </div>
                    <div class="info-card">
                        <div class="icon">👥</div>
                        <h4>타겟 고객</h4>
                        <p>${travelPlan.targetCustomer?.type || '일반 여행객'}</p>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2>📍 방문 도시</h2>
                <div class="destinations-grid">
                    ${destinations.map(dest => `
                        <div class="destination-card">
                            <h3>${dest.city.nameKo}</h3>
                            <p><strong>도착:</strong> ${new Date(dest.arrivalDate).toLocaleDateString('ko-KR')}</p>
                            <p><strong>출발:</strong> ${new Date(dest.departureDate).toLocaleDateString('ko-KR')}</p>
                            ${dest.activities.length > 0 ? `
                                <p><strong>주요 활동:</strong></p>
                                <ul style="margin-left: 20px; margin-top: 5px;">
                                    ${dest.activities.slice(0, 3).map(activity => `<li>${activity.name}</li>`).join('')}
                                </ul>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="section">
                <h2>✨ 특별한 혜택</h2>
                <div style="background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%); border-radius: 15px; padding: 30px; text-align: center;">
                    <h3 style="color: #333; margin-bottom: 15px;">🎁 얼리버드 할인</h3>
                    <p style="font-size: 1.1em; color: #555;">지금 예약하시면 <strong>15% 할인</strong> + <strong>무료 공항픽업</strong></p>
                    <p style="margin-top: 10px; color: #666;">*2024년 12월 31일까지 한정</p>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <h3>📞 문의 및 예약</h3>
            <div class="contact-info">
                <div class="contact-item">
                    <span>📱</span>
                    <span>${contactInfo.phone}</span>
                </div>
                <div class="contact-item">
                    <span>✉️</span>
                    <span>${contactInfo.email}</span>
                </div>
                <div class="contact-item">
                    <span>🌐</span>
                    <span>${contactInfo.website}</span>
                </div>
            </div>
            <div class="qr-code">
                QR 코드
            </div>
            <p style="margin-top: 20px; opacity: 0.8;">© 2024 Voyage Education. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
  };

  const handleGenerateBrochure = () => {
    const htmlContent = generateProfessionalBrochure();
    setGeneratedHTML(htmlContent);
    
    const material: PromotionalMaterial = {
      id: `mat_${Date.now()}`,
      travelPlanId: travelPlan.id,
      type: 'brochure',
      title,
      description,
      content: htmlContent,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    onSave(material);
  };

  // PDF 다운로드 기능
  const handleDownloadPDF = () => {
    if (generatedHTML) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(generatedHTML);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
        }, 250);
      }
    }
  };

  // 공통 데이터 생성 함수
  const generateExportData = (): CanvaExportData => ({
    title: title,
    description: description,
    template: selectedTemplate,
    destinations: travelPlan.destinations?.map(dest => ({
      name: dest.city.nameKo,
      arrivalDate: dest.arrivalDate,
      departureDate: dest.departureDate,
      activities: dest.activities.map(act => act.name)
    })) || [],
    budget: travelPlan.totalBudget || travelPlan.budget || 0,
    targetCustomer: travelPlan.targetCustomer?.type || '일반 여행객',
    contactInfo: contactInfo,
    colors: templates.find(t => t.id === selectedTemplate)?.color || '#667eea'
  });

  // Canva 연동을 위한 데이터 내보내기
  const handleExportToCanva = () => {
    const canvaData = generateExportData();
    exportToCanva(canvaData);
  };

  // Canva 템플릿으로 바로 이동
  const handleOpenCanvaTemplate = () => {
    const canvaData = generateExportData();
    const templateUrl = generateCanvaTemplateUrl(selectedTemplate, canvaData);
    window.open(templateUrl, '_blank');
  };

  // CSV 내보내기 (스프레드시트 연동용)
  const handleExportToCSV = () => {
    const canvaData = generateExportData();
    exportToCSV(canvaData);
  };

  // Adobe InDesign XML 내보내기
  const handleExportToInDesign = () => {
    const canvaData = generateExportData();
    exportToInDesignXML(canvaData);
  };

  // HTML 파일 다운로드
  const handleDownloadHTML = () => {
    if (generatedHTML) {
      const dataBlob = new Blob([generatedHTML], { type: 'text/html' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title}_brochure.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        🎨 전문 브로슈어 디자이너
      </h2>
      
      {/* 템플릿 선택 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">📋 템플릿 선택</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className={`h-32 rounded-lg bg-gradient-to-br ${template.color} mb-3 flex items-center justify-center text-4xl`}>
                {template.icon}
              </div>
              <h4 className="font-semibold text-gray-800">{template.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{template.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 브로슈어 내용 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">✏️ 브로슈어 내용</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="브로슈어 제목을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                설명
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="브로슈어 설명을 입력하세요"
              />
            </div>
          </div>
          
          {/* 연락처 정보 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700">📞 연락처 정보</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                전화번호
              </label>
              <input
                type="text"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="010-1234-5678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="contact@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                웹사이트
              </label>
              <input
                type="url"
                value={contactInfo.website}
                onChange={(e) => setContactInfo({...contactInfo, website: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://www.example.com"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 미리보기 */}
      {generatedHTML && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">👀 미리보기</h3>
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
            <iframe
              ref={printRef}
              srcDoc={generatedHTML}
              className="w-full h-96 border-0"
              title="브로슈어 미리보기"
            />
          </div>
        </div>
      )}

      {/* 액션 버튼들 */}
      <div className="space-y-4">
        {/* 생성 버튼 */}
        <div className="text-center">
          <button
            onClick={handleGenerateBrochure}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            ✨ 브로슈어 생성
          </button>
        </div>

        {/* 다운로드 및 연동 버튼들 */}
         {generatedHTML && (
           <div className="space-y-4">
             {/* 기본 다운로드 옵션 */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <button
                 onClick={handleDownloadHTML}
                 className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
               >
                 📄 HTML 다운로드
               </button>
               <button
                 onClick={handleDownloadPDF}
                 className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
               >
                 📑 PDF 인쇄
               </button>
               <button
                 onClick={handleExportToCSV}
                 className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
               >
                 📊 CSV 내보내기
               </button>
             </div>

             {/* 외부 프로그램 연동 옵션 */}
             <div className="border-t pt-4">
               <h4 className="text-sm font-semibold text-gray-700 mb-3">🔗 외부 프로그램 연동</h4>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <button
                   onClick={handleExportToCanva}
                   className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                 >
                   🎨 Canva 데이터
                 </button>
                 <button
                   onClick={handleOpenCanvaTemplate}
                   className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                 >
                   🚀 Canva 열기
                 </button>
                 <button
                   onClick={handleExportToInDesign}
                   className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                 >
                   📐 InDesign XML
                 </button>
               </div>
             </div>
           </div>
         )}
      </div>

      {/* 도움말 */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">💡 사용 팁</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>HTML 다운로드:</strong> 웹에서 바로 사용할 수 있는 완성된 브로슈어</li>
          <li>• <strong>PDF 인쇄:</strong> 인쇄용 고품질 브로슈어 (새 창에서 인쇄 대화상자 열림)</li>
          <li>• <strong>Canva 연동:</strong> JSON 파일을 다운로드하여 Canva에서 추가 편집 가능</li>
        </ul>
      </div>
    </div>
  );
};

export default BrochureDesigner;