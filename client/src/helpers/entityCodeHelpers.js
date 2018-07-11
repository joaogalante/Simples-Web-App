const calcDvCPF = (_cpf) => {
  let soma = 0
  let cpf = _cpf
  let w, i, j
  for (w = 0; w < 2; w++) {
    for (i = 0, j = cpf.length + 1; i < cpf.length; i++, j--)
      soma += (cpf.substr(i, 1) - 0) * j
    soma = (soma * 10) % 11
    if (soma === 10)
      soma = 0
    cpf = cpf + soma.toString()
    soma = 0
  }
  return cpf.substring(9, 11);
}

export const isCPFNumber = (_cpf) => {
  _cpf = _cpf.replace(/[^0-9]/g, "")
  let cpf
  if (_cpf.length === 11) {
      cpf = _cpf.substr(0, 9)
      cpf = cpf + calcDvCPF(cpf)
  }
  return (cpf === _cpf)
}

export const formatCPF = (_cpf) => {
  _cpf = _cpf.replace(/[^0-9]/g, "")
  return _cpf.replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1-$2")
}


const calcDvCNPJ = (_cnpj) => {
  let cnpj = _cnpj.substr(0, 12);
  let w, i;
  let soma = 0;
  let mult = "543298765432";
  for (w = 0; w < 2; w++) {
    for (i = 0; i < cnpj.length; i++)
      soma += (cnpj.substr(i, 1) - 0) * (mult.substr(i, 1));
    soma = (soma * 10) % 11;
    if (soma == 10)
      soma = 0;
    cnpj = cnpj + soma;
    soma = 0;
    mult = "6" + mult;
  }
  return cnpj.substr(12,14);
}

export const isCNPJNumber = (_cnpj) => {
  _cnpj = _cnpj.replace(/[^0-9]/g, "")
  var cnpj
  if (_cnpj.length === 14) {
    cnpj = _cnpj.substr(0, 12)
    cnpj = cnpj + calcDvCNPJ(cnpj)
  }
  return (cnpj === _cnpj)
}

export const formatCNPJ = (_cnpj) => {
  _cnpj = _cnpj.replace(/[^0-9]/g, "")
  return _cnpj.replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
}

export const unformatCode = (code) => code.replace(/\D/g,'')

export const formatCpfOrCnpj = (code) => {
  if(isCPFNumber(code)) return formatCPF(code)
  return formatCNPJ(code)
}

export const validateCNPJ = (code, fieldName) => {
  if(isCNPJNumber(code)) return false
  return { validations: { [fieldName || "code"]: 'CNPJ Invalido' } }
}

export const validateCPF = (code, fieldName) => {
  if(isCPFNumber(code)) return false
  return { validations: { [fieldName || "code"]: 'CPF Invalido' } }
}

export const validateCPFOrCNPJ = (code, fieldName) => {
  if(isCPFNumber(code) || isCNPJNumber(code)) return false
  return { validations: { [fieldName || "code"]: 'CPF/CNPJ Invalido' } }
}

export const displayCode = (entity) => {
	if(!entity) return ''
	if(entity.entityType === 'legal') {
		return entity.code ? formatCNPJ(entity.code) : 'Sem CNPJ'
	}
	if(entity.entityType === 'individual') {
		return entity.code ? formatCPF(entity.code) : 'Sem CPF'
	}
	return entity.code ? formatCpfOrCnpj(entity.code) : 'Sem CNPJ/CPF'
}
