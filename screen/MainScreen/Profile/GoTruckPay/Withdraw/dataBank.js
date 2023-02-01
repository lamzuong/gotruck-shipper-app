const bank = [
  {
    label: 'BIDV - Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
    value: 'BIDV',
  },
  {
    label: 'VietinBank - Ngân hàng TMCP Công thương Việt Nam',
    value: 'VietinBank',
  },
  {
    label: 'Vietcombank - Ngân hàng TMCP Ngoại Thương Việt Nam',
    value: 'Vietcombank',
  },
  {
    label: 'VPBank - Ngân hàng TMCP Việt Nam Thịnh Vượng',
    value: 'VPBank',
  },
  {
    label: 'MB - Ngân hàng TMCP Quân Đội',
    value: 'MB',
  },
  {
    label: 'Techcombank - Ngân hàng TMCP Kỹ Thương',
    value: 'Techcombank',
  },
  {
    label: 'Agribank - Ngân hàng NN&PT Nông thôn Việt Nam',
    value: 'Agribank',
  },
  {
    label: 'ACB - Ngân hàng TMCP Á Châu',
    value: 'ACB',
  },
  {
    label: 'HDBank - Ngân hàng TMCP Phát triển Thành phố Hồ Chí Minh',
    value: 'HDBank',
  },
  {
    label: 'SHB - Ngân hàng TMCP Sài Gòn – Hà Nội',
    value: 'SHB',
  },
  {
    label: 'Sacombank - Ngân hàng TMCP Sài Gòn Thương Tín',
    value: 'Sacombank',
  },
  {
    label: 'VBSP - Ngân hàng Chính sách xã hội Việt Nam',
    value: 'VBSP',
  },
  {
    label: 'VIB - Ngân hàng TMCP Quốc Tế ',
    value: 'VIB',
  },
  {
    label: 'MSB - Ngân hàng TMCP Hàng Hải',
    value: 'MSB',
  },
  {
    label: 'SCB - Ngân hàng TMCP Sài Gòn',
    value: 'SCB',
  },
  {
    label: 'VDB - Ngân hàng Phát triển Việt Nam',
    value: 'VDB',
  },
  {
    label: 'SeABank - Ngân hàng TMCP Đông Nam Á',
    value: 'SeABank',
  },
  {
    label: 'OCB - Ngân hàng TMCP Phương Đông',
    value: 'OCB',
  },
  {
    label: 'Eximbank - Ngân hàng TMCP Xuất Nhập Khẩu',
    value: 'Eximbank',
  },
  {
    label: 'LienVietPostBank - Ngân hàng TMCP Bưu điện Liên Việt',
    value: 'LienVietPostBank',
  },
  {
    label: 'TPBank - Ngân hàng TMCP Tiên Phong',
    value: 'TPBank',
  },
  {
    label: 'PVcomBank - Ngân hàng TMCP Đại Chúng Việt Nam',
    value: 'PVcomBank',
  },
  {
    label: 'Woori - Ngân hàng TNHH MTV Woori Việt Nam',
    value: 'Woori',
  },
  {
    label: 'Bac A Bank - Ngân hàng TMCP Bắc Á',
    value: 'Bac A Bank',
  },
  {
    label: 'HSBC - Ngân hàng TNHH MTV HSBC Việt Nam',
    value: 'HSBC',
  },
  {
    label: 'SCBVL - Ngân hàng TNHH MTV Standard Chartered Việt Nam',
    value: 'SCBVL',
  },
  {
    label: 'PBVN - Ngân hàng TNHH MTV Public Bank Việt Nam',
    value: 'PBVN',
  },
  {
    label: 'ABBANK - Ngân hàng TMCP An Bình',
    value: 'ABBANK',
  },
  {
    label: 'SHBVN - Ngân hàng TNHH MTV Shinhan Việt Nam',
    value: 'SHBVN',
  },
  {
    label: 'VietABank - Ngân hàng TMCP Việt Á',
    value: 'VietABank',
  },
  {
    label: 'DongA Bank - Ngân hàng TMCP Đông Á',
    value: 'DongA Bank',
  },
  {
    label: 'UOB - Ngân hàng TNHH MTV UOB Việt Nam',
    value: 'UOB',
  },
  {
    label: 'Vietbank - Ngân hàng TMCP Việt Nam Thương Tín',
    value: 'Vietbank',
  },
  {
    label: 'Nam A Bank - Ngân hàng TMCP Nam Á',
    value: 'Nam A Bank',
  },
  {
    label: 'NCB - Ngân hàng TMCP Quốc dân',
    value: 'NCB',
  },
  {
    label: 'OceanBank - Ngân hàng TNHH MTV Đại Dương',
    value: 'OceanBank',
  },
  {
    label: 'CIMB - Ngân hàng TNHH MTV CIMB Việt Nam',
    value: 'CIMB',
  },
  {
    label: 'Viet Capital Bank - Ngân hàng TMCP Bản Việt',
    value: 'Viet Capital Bank',
  },
  {
    label: 'Kienlongbank - Ngân hàng TMCP Kiên Long',
    value: 'Kienlongbank',
  },
  {
    label: 'IVB - Ngân hàng TNHH Indovina',
    value: 'IVB',
  },
  {
    label: 'BAOVIET Bank - Ngân hàng TMCP Bảo Việt',
    value: 'BAOVIET Bank',
  },
  {
    label: 'SAIGONBANK - Ngân hàng TMCP Sài Gòn Công Thương',
    value: 'SAIGONBANK',
  },
  {
    label: 'Co-opBank - Ngân hàng Hợp tác xã Việt Nam',
    value: 'Co-opBank',
  },
  {
    label: 'GPBank - Ngân hàng TNHH MTV Dầu khí toàn cầu',
    value: 'GPBank',
  },
  {
    label: 'VRB - Ngân hàng Liên doanh Việt Nga',
    value: 'VRB',
  },
  {
    label: 'CB Bank - Ngân hàng TNHH MTV Xây dựng',
    value: 'CB',
  },
  {
    label: 'PG Bank - Ngân hàng TMCP Xăng dầu Petrolimex',
    value: 'PG Bank',
  },
  {
    label: 'ANZVL - Ngân hàng TNHH MTV ANZ Việt Nam',
    value: 'ANZVL',
  },
  {
    label: 'HLBVN - Ngân hàng TNHH MTV Hong Leong Việt Nam',
    value: 'HLBVN',
  },
];
export default bank;
