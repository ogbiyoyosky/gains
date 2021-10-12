import { Consoler } from "./providers/console.provider";
import { Mailtrap } from "./providers/mailtrap.provider";

export default {
    mailtrap: new Mailtrap(),
    consoler: new Consoler()
}