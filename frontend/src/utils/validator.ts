export const containsSpecialCharacters = (anyText: string) => {
  // 한글, 영어, 숫자만 허용하는 정규식
  const regex = /^[가-힣a-zA-Z0-9]+$/
  // 정규식에 맞지 않으면 특수 문자가 포함된 것으로 판단
  return !regex.test(anyText)
}
