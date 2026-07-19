'use client';
import { useEffect, useState } from 'react';
import apiClient from '@/lib/services/apiClient';
import { Printer, ArrowLeft, Droplet, Heart, Share2, Medal, CheckCircle2, Award } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PublicCertificatePage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchCertificate(Number(params.id));
    }
  }, [params.id]);

  const fetchCertificate = async (id: number) => {
    try {
      setLoading(true);
      // Gọi API public không cần token
      const res = await apiClient.get<any, any>(`/donor/public/certificate/${id}`);
      if (res && res.data) {
        setData(res.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể tải giấy chứng nhận. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blood"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Droplet className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Không tìm thấy chứng nhận</h2>
          <p className="text-slate-500 mb-6">{error}</p>
          <button onClick={() => router.push('/')} className="bg-navy text-white px-6 py-2 rounded-lg font-medium hover:bg-navy/90 transition-colors w-full">
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans print:bg-white print:py-0 print:px-0">
      <div className="max-w-4xl mx-auto space-y-6 relative">
        
        {/* Toolbar - Ẩn khi in */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden bg-white p-4 rounded-2xl shadow-sm relative z-50">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-navy transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            Về trang chủ
          </Link>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleCopyLink} 
              className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors font-medium"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              {copied ? 'Đã chép link' : 'Chia sẻ'}
            </button>
            <button 
              onClick={handlePrint} 
              className="flex items-center gap-2 bg-blood text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-sm font-medium"
            >
              <Printer className="w-4 h-4" />
              In chứng nhận
            </button>
          </div>
        </div>

        {/* Certificate Card */}
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden print:shadow-none print:rounded-none">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-amber-500 to-red-500"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 transform -translate-x-1/2 translate-y-1/2"></div>
          
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <Heart className="w-96 h-96" />
          </div>

          <div className="relative z-10 p-10 sm:p-16 lg:p-24 border-[12px] border-transparent">
            {/* Inner Border */}
            <div className="absolute inset-4 sm:inset-8 border-2 border-dashed border-amber-200 rounded-2xl pointer-events-none print:inset-2"></div>

            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-50 rounded-full mb-6 ring-8 ring-red-50/50">
                <Medal className="w-10 h-10 text-blood" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy tracking-tight mb-4 uppercase">
                GIẤY CHỨNG NHẬN
              </h1>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-300"></div>
                <h2 className="text-xl sm:text-2xl font-semibold text-amber-600 uppercase tracking-widest">HIẾN MÁU TÌNH NGUYỆN</h2>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-300"></div>
              </div>
            </div>

            {/* Body */}
            <div className="text-center space-y-8 mb-16">
              <p className="text-lg sm:text-xl text-slate-500">Ban tổ chức trân trọng chứng nhận và tri ân:</p>
              
              <div className="py-4">
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blood italic tracking-wide">
                  {data?.donor_name}
                </h3>
              </div>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Đã có nghĩa cử cao đẹp, hiến tặng những giọt máu quý giá của mình để cứu người, thể hiện tinh thần tương thân tương ái vì sức khỏe cộng đồng.
              </p>
            </div>

            {/* Stats / Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto mb-16">
              <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Mã chứng nhận</p>
                <p className="text-sm sm:text-base font-bold text-navy truncate" title={data?.certificate_no}>{data?.certificate_no}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Ngày hiến</p>
                <p className="text-sm sm:text-base font-bold text-navy">{new Date(data?.donation_date).toLocaleDateString('vi-VN')}</p>
              </div>
              <div className="bg-red-50 rounded-2xl p-4 text-center border border-red-100">
                <p className="text-xs sm:text-sm font-semibold text-red-400 uppercase tracking-wider mb-1">Nhóm máu</p>
                <p className="text-lg sm:text-xl font-bold text-blood">{data?.blood_type || 'Chưa rõ'}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Lượng máu</p>
                <p className="text-sm sm:text-base font-bold text-navy">{data?.volume_ml} ml</p>
              </div>
            </div>

            {/* Footer Signatures */}
            <div className="flex flex-col sm:flex-row justify-between items-center max-w-3xl mx-auto pt-8">
              <div className="text-center mb-8 sm:mb-0">
                <p className="text-slate-500 mb-2 font-medium">Đơn vị tiếp nhận</p>
                <p className="font-bold text-navy text-lg">{data?.facility_name}</p>
              </div>
              <div className="text-center">
                <p className="text-slate-500 mb-2 font-medium">Ngày cấp</p>
                <p className="font-semibold text-slate-800 text-lg">{new Date(data?.issue_date).toLocaleDateString('vi-VN')}</p>
                <div className="mt-8">
                  <div className="h-20 w-20 mx-auto bg-amber-50 rounded-full border border-amber-200 flex items-center justify-center mb-3 shadow-inner">
                    <Award className="w-8 h-8 text-amber-500" />
                  </div>
                  <p className="font-bold text-slate-800 text-base uppercase tracking-wide">Hệ Thống BloodLink</p>
                  <p className="text-xs text-slate-400 italic mt-1">Chứng nhận điện tử hợp lệ</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
