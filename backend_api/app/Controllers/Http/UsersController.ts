//import { Application } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class UsersController {

    public async index(){
        return User.all()
    }

    public async show({request}: HttpContextContract) {

        const id = request.input('id')
    
        var quearyArray:any[] = []
    
        const userDetails = await User.query().where('id', id).first()
    
        const batsmanDetails = await Database
        .from('balls')
        .select()
        .sum('run':'total_run')
        .avg('run':'average_run')
        .count('id':'total_ball_faced')
      .where('batsman_id', '=', id).first()

      //return batsmanDetails    
      const strikeRate = {'strikeRate':batsmanDetails.total_run/batsmanDetails.total_ball_faced * 100}
     // return strikeRate
      const four = await Database.from('balls').select().count('run':'total_four').where('run','=',4).andWhere('batsman_id', '=', id).first()
      const six = await Database.from('balls').select().count('run':'total_six').where('run','=',6).andWhere('batsman_id', '=', id).first()
      
      const battingDetails = {...batsmanDetails, ...four, ...six, ...strikeRate}

     // return battingDetails

      // const batingDetails = await User.query()
      // .where("id", id)
      // .withCount("balls", (query) => {
      //   query.sum("run").as("total_run");
      // })
      // .withCount("balls", (query) => {
      //   query.avg("run").as("avg_run");
      // })
      // .withCount("balls", (query) => {
      //   query.count("id").as("total_ball_faced");
      // })
      // .withCount("balls", (query) => {
      //   query.where("run", "=", 4).count("id").as("total_Boundery_four");
      // })
      // .withCount("balls", (query) => {
      //   query.where("run", "=", 6).count("id").as("total_boundery_six");
      // }).firstOrFail();

      // return 'Hello World'

        const bowlerDetails = await Database
        .from('balls')
        .select()
        .sum('run':'total_run_conceded')
        .sum('extra':'total_extra_concede')
        .avg('run':'average_run_of_the_bowler')
        .avg('speed':'average_speed_of_the_bowler')
        .count('over_id':'total_over')
        .where('bowler_id', '=', id).first()
      
      const econmy_rate = {'econmy_rate':(bowlerDetails.total_run + bowlerDetails.total_extra_run)
                             / ((1/6)*bowlerDetails.total_ball_do)}
                             
      const total_wicket = await Database.from('balls').select().count('out_type')
                            .where('out_type','!=', 'Not-Out')
                            .where('out_type','!=', 'Stamping')
                            .andWhere('bowler_id', '=', id).first()
    
      const bowlingDetails = {...bowlerDetails, ...econmy_rate, ...total_wicket}
    
      quearyArray.push(userDetails)
      quearyArray.push({'battingDetails': battingDetails})
      quearyArray.push({'bowlingDetails': bowlingDetails})
    
      return quearyArray

    }

    public async store({ request }: HttpContextContract) {
       
        let obj = {
           
            sure_name: request.all().sure_name ,
            middle_name: request.all().middle_name ,
            last_name: request.all().last_name ,
            player_type: request.all().player_type, 
            idcard: request.all().idcard,
            play_role: request.all().play_role,
            batting_style: request.all().batting_style , 
            bowling_style: request.all().bowling_style,
            address: request.all().address , 
            dob: request.all().dob , 
            hight: request.all().hight,
            weight: request.all().weight , 
            gender:request.all().gender , 
            email:request.all().email , 
            hair_style: request.all().hair_style , 
            phone: request.all().phone,
            country: request.all().country,
            city: request.all().city,
            pic: ''
        }
        return User.create(obj)
    }
}

