 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


import Over from 'App/Models/Over';
import Database from '@ioc:Adonis/Lucid/Database';

export default class OversController {
    public async store({ request }: HttpContextContract){
        let obj = {
            bowler_id: request.all().bowler_id
        }
        return Over.create(obj)
        
    }
    public async overDetails({ request }: HttpContextContract) {
        const id = request.input('id')
    
        const overDetails = { 'overDetails':await Over.query().where('id', id).first()}
    
        const overBallDetails = { 'overBallDetails' :await Database.from('balls').select().where('over_id', '=', id)}
    
        return {...overDetails, ...overBallDetails}
      }
}
