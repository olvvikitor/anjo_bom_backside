
export  class  GenerateCodeService {
 
   static generateFourDigitCode() {
    const codeGenerated = Math.floor(1000 + Math.random() * 9000);
    const code:string = codeGenerated.toString().padStart(4, '0');
    return code;
}
}
