import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';


import Ball from "App/Models/Ball";

export default class BallsController {
    public async show(){
        return Ball.all()
    }
    public async store({ request }: HttpContextContract){
            
        let obj = {
            over_id : request.all().over_id , 
            bowler_id : request.all().bowler_id ,
            batsman_id : request.all().batsman_id , 
            run : request.all().run , 
            extra : request.all().extra , 
            speed : request.all().speed , 
            run_type : request.all().run_type , 
            ball_type : request.all().ball_type , 
            boundary : request.all().boundary , 
            out_type : request.all().out_type , 
            halper_id : request.all().halper_id , 
            out_player_id : request.all().out_player_id , 
        }
        return Ball.create(obj)
        
    }

    public async ballDetails({request}: HttpContextContract) {
    
        const id = request.all().id
    
        const quearyArray: any[] = []

        const ballDetails = await Database
        .from('balls')
        .select().where('balls.id', id)
        .first()

        quearyArray.push(ballDetails)

        
    
        
        const batsman = {'batsman': await Database
        .from('users')
        .select().where('users.id', ballDetails.batsman_id)
        .first()}

        quearyArray.push(batsman)
       
        
        const bowler = {'bowler': await Database
        .from('users')
        .select().where('users.id', ballDetails.bowler_id)
        .first()}

        quearyArray.push(bowler)
       
    
        if (ballDetails.halper_id) {
          const halper = {'halper': await Database
          .from('users')
          .select().where('users.id', ballDetails.halper_id)
          .first()}
          quearyArray.push(halper)
          
        }
        if (ballDetails.out_player_id) {
          const out_player = {'out_player': await Database
          .from('users')
          .select().where('users.id', ballDetails.out_player_id)
          .first()}
          quearyArray.push(out_player)
         
        }
    
        return  quearyArray
      }
}
