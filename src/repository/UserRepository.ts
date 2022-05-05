import { AppDataSource } from "../db/dbConfig";
import { User } from "../entity/User";

export class UserRepository {

    private userRepository = AppDataSource.getRepository(User);

    public saveUser = async (user: User) => {
        try {
            return await this.userRepository.save(user)
        } catch (error) {
            throw error;
        }
    }

    public getUser = async (username: string) => {
        try {
            return await this.userRepository.findOneBy({ username })
        } catch (error) {
            throw error;
        }
    }

    public allUsers = async () => {
        try {
            return await this.userRepository.find()
        } catch (error) {
            throw error;
        }
    }


}


