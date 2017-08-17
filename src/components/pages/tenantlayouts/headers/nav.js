import React, {Component} from 'react';
import {connect} from 'react-redux';
import SecondaryNav from "./navigation/SecondaryNav";
import PrimaryNav from "./navigation/PrimaryNav";
import LoadingBar from 'react-redux-loading-bar';
import PropTypes from 'prop-types';
import {logout} from '../../../../state/actions/authAction';

