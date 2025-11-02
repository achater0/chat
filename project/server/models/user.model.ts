import { app } from "../start.js";

interface UserWithPassword {
  id: number;
  username: string;
  email: string;
  password: string;
  two_factor_code: string,
  two_factor_code_expires: string,
  two_factor_enabled: boolean
}

interface CreateUserData {
  username: string;
  email: string;
  password: string;
}

interface UpdateUserData {
  username?: string;
  email?: string;
  password?: string;
  two_factor_code?: string | null,
  two_factor_code_expires?: string | null,
}

class UserModel {
  findByUsername(username: string): Promise<UserWithPassword | null> {
    return new Promise((resolve, reject) => {
      app.db.get(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err: Error | null, user: UserWithPassword | undefined) => {
          if (err) {
            reject(err);
          } else {
            resolve(user || null);
          }
        }
      );
    });
  }

  findByEmail(email: string): Promise<UserWithPassword | null> {
    return new Promise((resolve, reject) => {
      app.db.get(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err: Error | null, user: UserWithPassword | undefined) => {
          if (err) {
            reject(err);
          } else {
            resolve(user || null);
          }
        }
      );
    });
  }

  findById(id: number): Promise<UserWithPassword | null> {
    return new Promise((resolve, reject) => {
      app.db.get(
        'SELECT * FROM users WHERE id = ?',
        [id],
        (err: Error | null, user: UserWithPassword | undefined) => {
          if (err) {
            reject(err);
          } else {
            resolve(user || null);
          }
        }
      )
    })
  }

  create(userData: CreateUserData): Promise<number> {
    return new Promise((resolve, reject) => {
      const { username, email, password } = userData;

      app.db.run(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, password],
        function (this: { lastID: number }, err: Error | null) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        }
      );
    });
  }

  update(id: number, updates: UpdateUserData): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const fields = Object.keys(updates) as Array<keyof UpdateUserData>;
      const setClause = fields.map(field => `${field} = ?`).join(', ');
      const values = [...Object.values(updates), id];

      app.db.run(
        `UPDATE users SET ${setClause} WHERE id = ?`,
        values,
        function(this: {changes: number}, err: Error | null) {
          if (err) {
            reject(err);
          } else {
            resolve(this.changes > 0);
          }
        }
      );
    });
  }

  storeRefreshToken(userId: number, token: string, expiresAt: Date): Promise<void> {
    return new Promise((resolve, reject) => {
      app.db.run(
        'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
        [userId, token, expiresAt.toISOString()],
        (err: Error | null) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  findRefreshToken(token: string): Promise<{userId: number; expiresAt: string} | null> {
    return new Promise((resolve, reject) => {
      app.db.get(
        'SELECT user_id as userId, expires_at as expiresAt FROM refresh_tokens WHERE token = ?',
        [token],
        (err: Error | null, row: {userId: number; expiresAt: string} | undefined) => {
          if (err) {
            reject(err);
          } else {
            resolve(row || null);
          }
        }
      )
    });
  }

  deleteRefreshToken(token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      app.db.run(
        'DELETE FROM refresh_tokens WHERE token = ?',
        [token],
        function(this: {changes: number}, err: Error | null) {
          if (err) {
            reject(err);
          } else { 
            resolve(this.changes > 0);
          }
        }
      );
    });
  }
}

export default UserModel;
