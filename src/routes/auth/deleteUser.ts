import { Request, Response, RequestHandler } from "express";
import { auth } from "../../middlewares/auth";

/**
 * Imports models
 */
import { User } from "../../models/User";

/**
 * Handles deleting a user
 */
const deleteUser = async (req: Request, res: Response) => {
  try {
    /**
     * Remove user
     */
    const user = await User.findById(req.currentUser!.id);

    if (!user) return res.send({ msg: "Authorization denied" });

    await user.remove();

    res.send({ msg: "User deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

/**
 * Defines the controller
 */
const deleteUserController: RequestHandler[] = [auth, deleteUser];

export { deleteUserController };
