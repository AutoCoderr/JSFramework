import User from "../Entities/User";

export default class UserFixture {

    static action = async () => {
        const user = new User();
        user.setFirstname("Julien");
        user.setLastname("BOUVET");
        user.setEmail("julienbouvet78@hotmail.com");
        user.addRole("USER");
        user.setPassword("1234");

        await user.save();

        for (let i=1;i<=10;i++) {
            const user = new User();
            user.setFirstname("test"+i);
            user.setLastname("test"+i);
            user.setEmail("test"+i+"@test.com");
            user.addRole("USER");
            user.setPassword("1234");
            await user.save();
        }
    }
}