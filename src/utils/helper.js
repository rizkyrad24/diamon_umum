export function parseStatusAproval(positionLevel, status) {
    if (status?.includes("Revisi")) {
        return "Revisi"
    }
    if (positionLevel == 1) {
        return "Waiting Approval"
    }
    if (positionLevel == 2) {
        return "Approval Manager"
    }
    if (positionLevel == 3) {
        return "Approval VP"
    }
    if (positionLevel == 4) {
        return "Approval Direksi"
    }
    return status
}

export function saveDataLogin(dataUser) {
  localStorage.setItem('access', dataUser.token);
  localStorage.setItem('userId', dataUser.id);
  localStorage.setItem('username', dataUser.username);
  localStorage.setItem('firsName', dataUser.firsName);
  localStorage.setItem('lastName', dataUser.lastName);
  localStorage.setItem('position', dataUser.role.toLowerCase());
}

export function clearDataLogin() {
  localStorage.removeItem('access');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  localStorage.removeItem('firsName');
  localStorage.removeItem('lastName');
  localStorage.removeItem('position');
}

export function mapperStatus(positionLevel, status) {
  if (status == 'Selesai') {
    return ['Selesai', 'bg-[#E2FCF3] text-[#0EA976] border-[#8ADFC3]']
  }
  if (status == 'Ditolak') {
    return ['Ditolak', 'bg-[#FFE5E6] text-[#FF5656] border-[#FD8A8A]']
  }
  if ('Revisi'.includes(status)) {
    return ['Revisi', 'bg-[#FFE5E6] text-[#FF8000] border-[#FFD6AD]']
  }
  if (positionLevel == 0) {
    return ['Draft', 'bg-[#FFF3E6] text-[#FF8000] border-[#FFD6AD]']
  }
  if (positionLevel == 1) {
    return ['Waiting Approval', 'bg-[#FFF6E1] text-[#FFB200] border-[#FFD064]']
  }
  if (positionLevel == 2) {
    return ['Approval Manager', 'bg-[#E2FCF3] text-[#0EA976] border-[#8ADFC3]']
  }
  if (positionLevel == 3) {
    return ['Approval VP', 'bg-[#E2FCF3] text-[#0EA976] border-[#8ADFC3]']
  }
  if (positionLevel >= 4) {
    return ['Masuk Kemitraan', 'bg-[#E2FCF3] text-[#0EA976] border-[#8ADFC3]']
  }
}

export function mapperKeterangan(positionLevel, status) {
  if (status == 'Selesai') {
    return 'Pengajuan Selesai'
  }
  if (status == 'Ditolak') {
    if (positionLevel == 1) {
      return 'Pengajuan Ditolak Oleh Manager'
    }
    if (positionLevel == 2) {
      return 'Pengajuan Ditolak Oleh VP'
    }
    if (positionLevel > 2) {
      return 'Pengajuan Ditolak Kemitraan'
    }
    else {
      return 'Pengajuan Ditolak'
    }
  }
  return ''
}

export const getNewId = (dataRows) => {
  if (dataRows.length === 0) return 0;
  return dataRows[dataRows.length - 1].id + 1;
};

export const getNewKey = (dataRows) => {
  if (dataRows.length === 0) return 0;
  return dataRows[dataRows.length - 1].key + 1;
};

export const partnershipTypeParsing = (partnershipType) => {
  if (partnershipType == "Join Operation") {
    return {value: 'JO', label: 'Join Operation'}
  }
  if (partnershipType == "Reseller") {
    return {value: 'R', label: 'Resseler'}
  }
  if (partnershipType == "Bundling Layanan") {
    return {value: 'B', label: 'Bundling Layanan'}
  }
  if (partnershipType == "Join Investment") {
    return {value: 'JI', label: 'Join Investmen'}
  }
}

export const budgedTypeParsing = (budgedType) => {
  if (budgedType == "Capex") {
    return {value: 'C', label: 'Capex'}
  }
  if (budgedType == "Opex") {
    return {value: 'O', label: 'Opex'}
  }
  if (budgedType == "Opex & Capex") {
    return {value: 'OC', label: 'Capex & Apex'}
  }
}

export const materialTypeParsing = (materialType) => {
  if (materialType == "Material Only") {
    return {value: 'M', label: 'Material Only'}
  }
  if (materialType == "Service Only") {
    return {value: 'S', label: 'Service Only'}
  }
  if (materialType == "Material and Service") {
    return {value: 'MS', label: 'Material and Service'}
  }
}

export const methodTypeParsing = (methodType) => {
  if (methodType == "Tunjuk Langsung") {
    return {value: 'T1', label: 'Tunjuk Langsung'}
  }
  if (methodType == "Terbuka") {
    return {value: 'T2', label: 'Terbuka'}
  }
}