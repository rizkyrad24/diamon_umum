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

export function mapperStatus(positionLevel, status, attachments, isStopClock) {
  const fileKemitraan = {
    file1: null,
    file2: null,
    file3: null,
    file4: null,
    file5: null,
    file6: null,
    file7: null,
  }
  attachments.forEach(item => {
    if (item.fileType == 'Surat Penawaran') {
      fileKemitraan['file1'] = item.fileName
    }
    if (item.fileType == 'Proposal') {
      fileKemitraan['file2'] = item.fileName
    }
    if (item.fileType == 'Evaluasi') {
      fileKemitraan['file3'] = item.fileName
    }
    if (item.fileType == 'Negosiasi') {
      fileKemitraan['file4'] = item.fileName
    }
    if (item.fileType == 'BAK Pemilihan Mitra') {
      fileKemitraan['file5'] = item.fileName
    }
    if (item.fileType == 'Surat Pesanan') {
      fileKemitraan['file6'] = item.fileName
    }
    if (item.fileType == 'PKS') {
      fileKemitraan['file7'] = item.fileName
    }
  })
  if (isStopClock) {
    return ['Dipending', 'bg-[#FFE5E6] text-[#FF8000] border-[#FFD6AD]']
  }
  if (status == 'Approved' && positionLevel >= 8) {
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
    return ['Waiting Approval Manager', 'bg-[#FFF6E1] text-[#FFB200] border-[#FFD064]']
  }
  if (positionLevel == 2) {
    return ['Waiting Approval VP', 'bg-[#E2FCF3] text-[#0EA976] border-[#8ADFC3]']
  }
  if (positionLevel == 3) {
    return ['Masuk Kemitraan', 'bg-[#E2FCF3] text-[#0EA976] border-[#8ADFC3]']
  }
  if (positionLevel == 4) {
    return ['Masuk Ke Staff Kemitraan', 'bg-[#E2FCF3] text-[#0EA976] border-[#8ADFC3]']
  }
  if (positionLevel == 5 && fileKemitraan.file7) {
    return ['PKS', 'bg-[#E2FCF3] text-[#0EA976] border-[#8ADFC3]']
  }
  if (positionLevel == 5 && fileKemitraan.file6) {
    return ['Surat Pesanan', 'bg-[#E2FCF3] text-[#0EA976] border-[#8ADFC3]']
  }
  if (positionLevel == 5 && fileKemitraan.file5) {
    return ['BAK Pemilihan Mitra', 'bg-[#E2FCF3] text-[#0EA976] border-[#8ADFC3]']
  }
  if (positionLevel == 5 && fileKemitraan.file4) {
    return ['Negosiasi', 'bg-[#E2FCF3] text-[#0EA976] border-[#8ADFC3]']
  }
  if (positionLevel == 5 && fileKemitraan.file3) {
    return ['Evaluasi', 'bg-[#E7F1FD] text-[#4791F2] border-[#91BEF7]']
  }
  if (positionLevel == 5 && fileKemitraan.file2) {
    return ['Proposal', 'bg-[#E7F1FD] text-[#4791F2] border-[#91BEF7]']
  }
  if (positionLevel == 5 && fileKemitraan.file1) {
    return ['Surat Penawaran', 'bg-[#E7F1FD] text-[#4791F2] border-[#91BEF7]']
  }
  if (positionLevel == 5) {
    return ['DiProses Staff Kemitraan', 'bg-[#E2FCF3] text-[#0EA976] border-[#8ADFC3]']
  }
  if (positionLevel == 6) {
    return ['Waiting Approval Manager Kemitraan', 'bg-[#E2FCF3] text-[#0EA976] border-[#8ADFC3]']
  }
  if (positionLevel == 7) {
    return ['Pembuatan Kontrak', 'bg-[#E2FCF3] text-[#0EA976] border-[#8ADFC3]']
  }
  if (positionLevel == 8) {
    return ['Waiting Approval VP Kemitraan', 'bg-[#E2FCF3] text-[#0EA976] border-[#8ADFC3]']
  }
  if (positionLevel == 9) {
    return ['Waiting Approval Direktur Kemitraan', 'bg-[#E2FCF3] text-[#0EA976] border-[#8ADFC3]']
  }
  if (positionLevel == 10) {
    return ['Disetujui Direktur Kemitraan', 'bg-[#E2FCF3] text-[#0EA976] border-[#8ADFC3]']
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

export const dateParsing = (input) => {
  if (input.includes("-")) {
    const [year, month, date] = input.split("-")
    return `${date}-${month}-${year}`
  }
  return input
}