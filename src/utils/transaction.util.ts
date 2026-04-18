import mongoose from "mongoose";

export async function withMongoDBTransaction<T>(
  fn: (session: mongoose.ClientSession) => Promise<T>
): Promise<T> {

  const session = await mongoose.startSession();

  try {
    return await session.withTransaction(async () => {
     return await fn(session);
    });

  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  } finally {
    session.endSession();
  }
}