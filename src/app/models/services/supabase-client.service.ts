import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  createClient,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import {environment} from '../../../environments/environment';
import {IProfile} from '../profile';
import {IBase} from '../base';

@Injectable({
  providedIn: 'root',
})
export class SupabaseClientService {
  private readonly _supabase: SupabaseClient;

  constructor() {
    this._supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get raw() {
    return this._supabase
  }

  get user() {
    return this._supabase.auth.user();
  }

  get session() {
    return this._supabase.auth.session();
  }

  get profile() {
    return this._supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', this.user?.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this._supabase.auth.onAuthStateChange(callback);
  }

  signIn(opts: { email: string; password: string }) {
    return this._supabase.auth.signIn(opts);
  }

  signUp(opts: { email: string; password: string }) {
    return this._supabase.auth.signUp(opts);
  }

  signOut() {
    return this._supabase.auth.signOut();
  }

  updateProfile(profile: IProfile) {
    const update = {
      ...profile,
      id: this.user?.id,
      updated_at: new Date(),
    };

    return this._supabase.from('profiles').upsert(update, {
      returning: 'minimal', // Don't return the value after inserting
    });
  }

  downLoadImage(path: string) {
    return this._supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this._supabase.storage.from('avatars').upload(filePath, file);
  }



  /**
   * TODO keep below
   * TODO keep below
   * TODO keep below
   * TODO keep below
   * TODO keep below
   * TODO keep below
   */



  create<T extends IBase>(from: string, data: Partial<T> | Partial<T>[]) {
    return this._supabase.from<T>(from).upsert(data).single();
  }

  deleteMany<T extends IBase>(from: string, props: Partial<T>) {
    let op = this._supabase.from<T>(from).delete();

    Object.entries(props).forEach(([ key, val ]) => {
      op = op.eq(key as keyof T, val);
    });

    return op;
  }

  updateMany<T extends IBase>(from: string, props: Partial<T>, data: Partial<T>) {
    let op = this._supabase.from<T>(from).update(data);

    Object.entries(props).forEach(([ key, val ]) => {
      op = op.eq(key as keyof T, val);
    });

    return op;
  }

  findOne<T extends IBase>(from: string, id: T['id']) {
    return this._supabase.from<T>(from).select().eq('id', id).single();
  }

  findMany<T extends IBase>(
    from: string,
    props: Partial<T>,
    opts?: {
      order?: {
        key: keyof T;
        ascending?: boolean;
        nullsFirst?: boolean;
      };
    },
  ) {
    let op = this._supabase.from<T>(from).select();

    Object.entries(props).forEach(([ key, val ]) => {
      op = op.eq(key as keyof T, val);
    });

    if (opts?.order?.key) {
      op = op.order(
        opts.order.key,
        {
          ascending: opts.order.ascending,
          nullsFirst: opts.order.nullsFirst,
        },
      );
    }

    return op;
  }

}
