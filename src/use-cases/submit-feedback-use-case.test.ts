import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

// funcão espiã pra checar se as funcões foram chamadas nos testes
const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()


const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy },
    {sendMail: sendMailSpy}
    )


// criando suite de testes unitários para o submit de feedback. As dependencias (nodemailer e db) não são passadas aqui pq queremos testar a funcionalidade pura.
describe('Submit feedback', () => {
    // submit geral do feedback
    it('should be able to submit a feedback', async() => {
        await expect(submitFeedback.execute({
            type: 'Bug',
            comment: 'example comment',
            screenshot: 'data:image/png;base64',
        })).resolves.not.toThrow()
        
        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
        })


    // teste de regras de negocio. Não envio de infos obrigatórias.
    it('should not be able to submit a feedback without type', async() => { 
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64',
        })).rejects.not.toThrow()
        })


        it('should not be able to submit a feedback without comment', async() => { 
            await expect(submitFeedback.execute({
                type: 'Bug',
                comment: '',
                screenshot: 'data:image/png;base64',
            })).rejects.not.toThrow()
            })

        it('should not be able to submit a feedback with invalid screenshot format', async() => { 
            await expect(submitFeedback.execute({
                type: 'Bug',
                comment: 'comment',
                screenshot: 'test.jpg',
            })).rejects.not.toThrow()
            })
    })







// checagem se está funcionando
// test('sum 2 + 2', () => {
//     expect(2 + 2).toBe(4)
// })