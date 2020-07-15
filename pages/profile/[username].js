import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import { useState, useEffect } from "react";

import Layout from "../../components/Layout";
import { userPublicProfile } from "../../actions/user";
import { API, DOMAIN, APP_NAME } from "../../config";

const UserProfile = () => {
  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5>username</h5>
                  <p>...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserProfile;
