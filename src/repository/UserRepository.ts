import { AppDataSource } from "../db/dbConfig";
import { User } from "../entity/User";

export class UserRepository {

    private userRepository= AppDataSource.getRepository(User);

    public saveUser = async (user: User) => {
        try {
            return await this.userRepository.save(user)
        } catch (err) {
            throw err;
        }
    }
}


